import { getCustomRepository } from 'typeorm';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';
import UserRepository from '../typeorm/repositories/userRepository';
import UserTokensRepository from '../typeorm/repositories/userTokensRepository';
import AppError from '@shared/errors/AppError';
import EtherealMail from '@config/mail/etherealMail';

// DTO's
import ResetPasswordDto from '../dtos/resetPasswordDto';

class TokenService {
	private userTokensRepository: UserTokensRepository;
	private userRepository: UserRepository;

	constructor() {
		this.userTokensRepository = getCustomRepository(UserTokensRepository);
		this.userRepository = getCustomRepository(UserRepository);
	}

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

		await EtherealMail.sendEmail({
			to: {
				name: userExists.name,
				email: userExists.email,
			},
			subject: '[API VENDAS] Recuperação de Email',
			templateData: {
				template: `Olá {{name}}: {{token}}`,
				variables: {
					name: userExists.name,
					token: token.token,
				},
			},
		});
	}

	public async resetPassword(
		resetPasswordDto: ResetPasswordDto,
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

		userExists.password = await hash(resetPasswordDto.password, 10);

		await this.userRepository.save(userExists);
	}
}

export default TokenService;
