import { injectable, inject } from 'tsyringe';
import { hash, compare } from 'bcryptjs';
import AppError from '@shared/errors/AppError';

// PROVIDERS
import StorageProvider from '@shared/providers/storage-provider/storageProvider';

// INTERFACES
import { IUserPaginate } from '../domain/models/IUserPaginate';
import { IUser } from '../domain/models/IUser';
import { ICreateUser } from '../domain/models/ICreateUser';
import { IUpdateUser } from './../domain/models/IUpdateUser';
import { IUpdateUserAvatar } from '../domain/models/IUpdateUserAvatar';
import { IUserRepository } from '../domain/repositories/IUserRepository';

@injectable()
class UserService {
	private storageProvider: StorageProvider;

	constructor(
		@inject('UserRepository')
		private readonly userRepository: IUserRepository,
	) {
		this.storageProvider = new StorageProvider();
	}

	public async createUser(createUserDto: ICreateUser): Promise<IUser> {
		const createUserData = {
			name: createUserDto.name,
			email: createUserDto.email,
			password: await this.encryptPassword(createUserDto.password),
			avatar: createUserDto.avatar,
		};

		const user = await this.userRepository.create(createUserData);

		return user;
	}

	public async findAllUsers(): Promise<IUserPaginate> {
		const users = await this.userRepository.createQueryBuilder().paginate();

		return users as IUserPaginate;
	}

	public async findUserById(userId: string): Promise<IUser> {
		const user = await this.userRepository.findById(userId);

		if (!user) {
			throw new AppError('User not found');
		}

		return user;
	}

	public async updateUserAvatar(
		updateUserAvatar: IUpdateUserAvatar,
	): Promise<IUser> {
		const user = await this.userRepository.findById(
			updateUserAvatar.userId,
		);

		if (!user) {
			throw new AppError('User not found');
		}

		if (user.avatar) {
			await this.storageProvider.getStorageProvider.deleteFile(
				user.avatar,
			);
		}

		const filename = await this.storageProvider.getStorageProvider.saveFile(
			updateUserAvatar.userAvatarFileName,
		);

		user.avatar = filename;

		await this.userRepository.save(user);

		return user;
	}

	public async updateUser(
		userId: string,
		updateUserDto: IUpdateUser,
	): Promise<IUser> {
		const user = await this.userRepository.findById(userId);

		if (!user) {
			throw new AppError('User not found');
		}

		if (updateUserDto.password && !updateUserDto.oldPassword) {
			throw new AppError('Old password is required to update password');
		}

		if (updateUserDto.password && updateUserDto.oldPassword) {
			const checkOldPassword = await compare(
				updateUserDto.oldPassword,
				user.password,
			);

			if (!checkOldPassword) {
				throw new AppError('Old password does not match');
			}

			updateUserDto.password = await hash(updateUserDto.password, 10);
		}

		const updatedUser = await this.userRepository.save({
			...user,
			...updateUserDto,
		});

		return updatedUser;
	}

	private async encryptPassword(password: string): Promise<string> {
		const hashedPassword = await hash(password, 10);

		return hashedPassword;
	}
}

export default UserService;
