import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import { classToClass } from 'class-transformer';
import AppError from '@shared/errors/AppError';

// INTERFACES
import { ICreateSessionResponseInterface } from '../domain/models/ICreateSessionResponseInterface';
import { ICreateTokenPayload } from '../domain/models/ICreateTokenPayload';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IHashProvider } from '../providers/hashProvider/models/IHashprovider';

// DTO'S
import CreateSessionDto from '../dtos/createSessionDto';

@injectable()
class SessionService {
	constructor(
		@inject('UserRepository')
		private readonly userRepository: IUserRepository,
		@inject('HashProvider')
		private readonly hashProvider: IHashProvider,
	) {}

	public async createSession(
		createSessionDto: CreateSessionDto,
	): Promise<ICreateSessionResponseInterface> {
		const user = await this.userRepository.findByEmail(
			createSessionDto.email,
		);

		if (!user) {
			throw new AppError('Incorrect email/password', 401);
		}

		const validPassword = await this.hashProvider.compareHash(
			createSessionDto.password,
			user.password,
		);

		if (!validPassword) {
			throw new AppError('Incorrect email/password', 401);
		}

		const payload: ICreateTokenPayload = {
			userId: user.id,
			email: user.email,
		};
		const token = this.createToken(payload, user.id);

		const response: ICreateSessionResponseInterface = {
			user,
			token,
		};

		response.user = classToClass(response.user);

		return response;
	}

	private createToken(payload: ICreateTokenPayload, subject: string) {
		try {
			const token = sign(payload, process.env.SECRET, {
				subject,
				expiresIn: process.env.EXPIRES_IN,
			});

			return token;
		} catch (error) {
			console.log(error);
			throw new AppError(error);
		}
	}
}

export default SessionService;
