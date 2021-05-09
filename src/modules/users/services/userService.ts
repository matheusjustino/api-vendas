import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import path from 'path';
import fs from 'fs';

import multerConfig from '@config/multer';

// REPOSITORES
import UserRepository from '../typeorm/repositories/userRepository';

// DTO's
import UpdateUserAvatarDto from '../dtos/updateUserAvatarDto';
import CreateUserDto from '../dtos/createUserDto';

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

		const userEntity = await this.userRepository.create(createUserData);
		const user = await this.userRepository.save(userEntity);

		return user;
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

	private async encryptPassword(password: string): Promise<string> {
		const hashedPassword = await hash(password, 10);

		return hashedPassword;
	}
}

export default UserService;
