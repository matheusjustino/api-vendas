import { Request, Response } from 'express';
import CreateUserDto from '../dtos/createUserDto';
import UpdateUserAvatarDto from '../dtos/updateUserAvatarDto';
import UserService from '../services/userService';

class UserController {
	public async createUser(request: Request, response: Response) {
		try {
			const createUserDto: CreateUserDto = request.body;
			const userService = new UserService();

			const user = await userService.createUser(createUserDto);

			return response.json(user);
		} catch (error) {
			return response.json({
				message: error.message,
				details: error.detail,
			});
		}
	}

	public async findAllUsers(request: Request, response: Response) {
		try {
			const userService = new UserService();

			const users = await userService.findAllUsers();

			return response.json(users);
		} catch (error) {
			return response.json(error);
		}
	}

	public async findUserById(request: Request, response: Response) {
		try {
			const { id } = request.params;

			const userService = new UserService();

			const user = await userService.findUserById(id);

			return response.json(user);
		} catch (error) {
			return response.json(error);
		}
	}

	public async updateUserAvatar(request: Request, response: Response) {
		try {
			const updateUserAvatarDto: UpdateUserAvatarDto = {
				userId: request.user.userId,
				userAvatarFileName: request.file.filename,
			};

			const userService = new UserService();

			const user = await userService.updateUserAvatar(
				updateUserAvatarDto,
			);

			return response.json(user);
		} catch (error) {
			return response.json(error);
		}
	}
}

const userController = new UserController();

export default userController;
