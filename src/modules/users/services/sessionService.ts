import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { classToClass } from 'class-transformer';
import AppError from '@shared/errors/AppError';

// INTERFACES
import CreateSessionResponseInterface from '../interfaces/createSessionResponseInterface';
import CreateTokenPayload from '../interfaces/createTokenPayload';
import { IUserRepository } from '../domain/repositories/IUserRepository';

// DTO'S
import CreateSessionDto from '../dtos/createSessionDto';

@injectable()
class SessionService {
	constructor(
		@inject('UserRepository')
		private readonly userRepository: IUserRepository,
	) {}

	public async createSession(
		createSessionDto: CreateSessionDto,
	): Promise<CreateSessionResponseInterface> {
		const user = await this.userRepository.findByEmail(
			createSessionDto.email,
		);

		if (!user) {
			throw new AppError('Incorrect email/password', 401);
		}

		const validPassword = await compare(
			createSessionDto.password,
			user.password,
		);

		if (!validPassword) {
			throw new AppError('Incorrect email/password', 401);
		}

		const payload: CreateTokenPayload = {
			userId: user.id,
			email: user.email,
		};
		const token = this.createToken(payload, user.id);

		const response: CreateSessionResponseInterface = {
			user,
			token,
		};

		response.user = classToClass(response.user);

		return response;
	}

	private createToken(payload: CreateTokenPayload, subject: string) {
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
