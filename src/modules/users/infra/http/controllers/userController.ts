import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

// DTO'S
import CreateUserDto from '../../../dtos/createUserDto';
import UpdateUserAvatarDto from '../../../dtos/updateUserAvatarDto';
import UpdateUserDto from '../../../dtos/updateUserDto';

// SERVICES
import UserService from '../../../services/userService';

class UserController {
	public async createUser(request: Request, response: Response) {
		try {
			const userService = container.resolve(UserService);
			const createUserDto: CreateUserDto = request.body;

			const user = await userService.createUser(createUserDto);

			return response.json(classToClass(user));
		} catch (error) {
			return response.json({
				message: error.message,
				details: error.detail,
			});
		}
	}

	public async findAllUsers(request: Request, response: Response) {
		try {
			const userService = container.resolve(UserService);

			const users = await userService.findAllUsers();

			return response.json(classToClass(users));
		} catch (error) {
			return response.json(error);
		}
	}

	public async findUserById(request: Request, response: Response) {
		try {
			const userService = container.resolve(UserService);
			const { id } = request.params;

			const user = await userService.findUserById(id);

			return response.json(classToClass(user));
		} catch (error) {
			return response.json(error);
		}
	}

	public async updateUserAvatar(request: Request, response: Response) {
		try {
			const userService = container.resolve(UserService);
			const updateUserAvatarDto: UpdateUserAvatarDto = {
				userId: request.user.userId,
				userAvatarFileName: request.file.filename,
			};

			const user = await userService.updateUserAvatar(
				updateUserAvatarDto,
			);

			return response.json(classToClass(user));
		} catch (error) {
			console.log(error);
			return response.json(error);
		}
	}

	public async updateUser(request: Request, response: Response) {
		try {
			const userService = container.resolve(UserService);
			const { id } = request.params;
			const updateUserDto: UpdateUserDto = request.body;

			const updatedUser = await userService.updateUser(id, updateUserDto);

			return response.json(classToClass(updatedUser));
		} catch (error) {
			return response.json({
				message: error.message,
				details: error.detail,
			});
		}
	}
}

const userController = new UserController();

export default userController;
