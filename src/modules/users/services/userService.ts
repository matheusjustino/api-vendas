import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { hash, compare } from 'bcryptjs';

// PROVIDERS
import StorageProvider from '@shared/providers/storage-provider/storageProvider';

// REPOSITORES
import UserRepository from '../typeorm/repositories/userRepository';

// DTO's
import UpdateUserAvatarDto from '../dtos/updateUserAvatarDto';
import CreateUserDto from '../dtos/createUserDto';
import UpdateUserDto from '../dtos/updateUserDto';

// ENTITIES
import User from '../typeorm/entities/user.entity';

// INTERFACES
import UserPaginate from '../interfaces/userPaginate';

class UserService {
	private userRepository: UserRepository;
	private storageProvider: StorageProvider;

	constructor() {
		this.userRepository = getCustomRepository(UserRepository);
		this.storageProvider = new StorageProvider();
	}

	public async createUser(createUserDto: CreateUserDto): Promise<User> {
		const createUserData = {
			name: createUserDto.name,
			email: createUserDto.email,
			password: await this.encryptPassword(createUserDto.password),
			avatar: createUserDto.avatar,
		};

		const userEntity = this.userRepository.create(createUserData);
		await this.userRepository.save(userEntity);

		return userEntity;
	}

	public async findAllUsers(): Promise<UserPaginate> {
		const users = await this.userRepository.createQueryBuilder().paginate();

		return users as UserPaginate;
	}

	public async findUserById(userId: string): Promise<User> {
		const user = await this.userRepository.findById(userId);

		if (!user) {
			throw new AppError('User not found');
		}

		return user;
	}

	public async updateUserAvatar(
		updateUserAvatarDto: UpdateUserAvatarDto,
	): Promise<User> {
		const user = await this.userRepository.findById(
			updateUserAvatarDto.userId,
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
			updateUserAvatarDto.userAvatarFileName,
		);

		user.avatar = filename;

		await this.userRepository.save(user);

		return user;
	}

	public async updateUser(
		userId: string,
		updateUserDto: UpdateUserDto,
	): Promise<User> {
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

		const updatedUserEntity = this.userRepository.create({
			...user,
			...updateUserDto,
		});

		const updatedUser = await this.userRepository.save(updatedUserEntity);

		return updatedUser;
	}

	private async encryptPassword(password: string): Promise<string> {
		const hashedPassword = await hash(password, 10);

		return hashedPassword;
	}
}

export default UserService;
