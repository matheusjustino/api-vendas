import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import CreateSessionResponseInterface from '../interfaces/createSessionResponseInterface';
import UserRepository from '../typeorm/repositories/userRepository';
import CreateSessionDto from '../dtos/createSessionDto';
import CreateTokenPayload from '../interfaces/createTokenPayload';

class SessionService {
	private userRepository: UserRepository;

	constructor() {
		this.userRepository = getCustomRepository(UserRepository);
	}

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

		return response;
	}

	private createToken(payload: CreateTokenPayload, subject: string) {
		const token = sign(payload, authConfig.jwt.secret, {
			subject,
			expiresIn: authConfig.jwt.expiresIn,
		});

		return token;
	}
}

export default SessionService;
