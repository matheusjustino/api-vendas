import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { hash, compare } from 'bcryptjs';
import path from 'path';
import fs from 'fs';

import multerConfig from '@config/multer';

// REPOSITORES
import UserRepository from '../typeorm/repositories/userRepository';

// DTO's
import UpdateUserAvatarDto from '../dtos/updateUserAvatarDto';
import CreateUserDto from '../dtos/createUserDto';
import UpdateUserDto from '../dtos/updateUserDto';

// ENTITIES
import User from '../typeorm/entities/user.entity';

class UserService {
	private userRepository: UserRepository;

	constructor() {
		this.userRepository = getCustomRepository(UserRepository);
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

	public async findAllUsers(): Promise<User[]> {
		const users = await this.userRepository.find();

		return users;
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
			const userAvatarFilePath = path.join(
				multerConfig.directory,
				user.avatar,
			);

			const userAvatarFileExists = await fs.promises.stat(
				userAvatarFilePath,
			);

			if (userAvatarFileExists) {
				await fs.promises.unlink(userAvatarFilePath);
			}
		}

		user.avatar = updateUserAvatarDto.userAvatarFileName;

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
