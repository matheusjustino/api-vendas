import { Request, Response } from 'express';
import { container } from 'tsyringe';

// INTERFACES
import { IResetPassword } from '@modules/users/domain/models/IResetPassword';

// SERVICES
import TokenService from '../../../services/tokenService';

class ForgotPasswordController {
	public async createToken(request: Request, response: Response) {
		try {
			const tokenService = container.resolve(TokenService);
			const { email } = request.body;

			await tokenService.sendForgotPasswordEmail(email);

			return response.status(204).json();
		} catch (error) {
			response.json(error);
		}
	}

	public async resetPassword(request: Request, response: Response) {
		try {
			const tokenService = container.resolve(TokenService);
			const resetPasswordDto: IResetPassword = request.body;

			await tokenService.resetPassword(resetPasswordDto);

			return response.status(204).json();
		} catch (error) {
			response.json(error);
		}
	}
}

const forgotPasswordController = new ForgotPasswordController();

export default forgotPasswordController;
