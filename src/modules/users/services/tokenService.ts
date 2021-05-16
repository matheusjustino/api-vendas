import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';
import path from 'path';

import AppError from '@shared/errors/AppError';
import EtherealMail from '@config/mail/etherealMail';

// INTERFACES
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IUserTokensRepository } from '../domain/repositories/IUserTokensRepository';
import { IResetPassword } from '../domain/models/IResetPassword';
import { IHashProvider } from '../providers/hashProvider/models/IHashprovider';

@injectable()
class TokenService {
	constructor(
		@inject('UserRepository')
		private readonly userRepository: IUserRepository,
		@inject('UserTokensRepository')
		private readonly userTokensRepository: IUserTokensRepository,
		@inject('HashProvider')
		private readonly hashProvider: IHashProvider,
	) {}

	public async sendForgotPasswordEmail(email: string): Promise<void> {
		const userExists = await this.userRepository.findByEmail(email);

		if (!userExists) {
			throw new AppError('User not found');
		}

		const token = await this.userTokensRepository.generateToken(
			userExists.id,
		);

		if (!token) {
			throw new AppError('Error trying to generate user token');
		}

		const forgotPasswordTemplate = path.resolve(
			__dirname,
			'..',
			'..',
			'..',
			'config',
			'mail',
			'views',
			'forgot_password.hbs',
		);

		await EtherealMail.sendEmail({
			to: {
				name: userExists.name,
				email: userExists.email,
			},
			subject: '[API VENDAS] Recuperação de Email',
			templateData: {
				file: forgotPasswordTemplate,
				variables: {
					name: userExists.name,
					link: `${process.env.APP_API_URL}/reset_password?token=${token.token}`,
				},
			},
		});
	}

	public async resetPassword(
		resetPasswordDto: IResetPassword,
	): Promise<void> {
		const userToken = await this.userTokensRepository.findByToken(
			resetPasswordDto.token,
		);

		if (!userToken) {
			throw new AppError('User token not found');
		}

		const userExists = await this.userRepository.findById(
			userToken.user_id,
		);

		if (!userExists) {
			throw new AppError('User not found');
		}

		const tokenCreatedAt = userToken.created_at;
		const compareDate = addHours(tokenCreatedAt, 2);

		if (isAfter(Date.now(), compareDate)) {
			throw new AppError('Token expired');
		}

		userExists.password = await this.hashProvider.generateHash(
			resetPasswordDto.password,
		);

		await this.userRepository.save(userExists);
	}
}

export default TokenService;
