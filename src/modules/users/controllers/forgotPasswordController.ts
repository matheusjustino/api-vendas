import { Request, Response } from 'express';
import ResetPasswordDto from '../dtos/resetPasswordDto';
import TokenService from '../services/tokenService';

class ForgotPasswordController {
	public async createToken(request: Request, response: Response) {
		try {
			const tokenService = new TokenService();
			const { email } = request.body;

			await tokenService.sendForgotPasswordEmail(email);

			return response.status(204).json();
		} catch (error) {
			response.json(error);
		}
	}

	public async resetPassword(request: Request, response: Response) {
		try {
			const tokenService = new TokenService();
			const resetPasswordDto: ResetPasswordDto = request.body;

			await tokenService.resetPassword(resetPasswordDto);

			return response.status(204).json();
		} catch (error) {
			response.json(error);
		}
	}
}

const forgotPasswordController = new ForgotPasswordController();

export default forgotPasswordController;
