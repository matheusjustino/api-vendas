import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import TokenPayload from '@modules/users/interfaces/tokenPayload';

export default function isAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction,
) {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		throw new AppError('JWT token is missing');
	}

	const [bearer, token] = authHeader.split(' ');

	try {
		const decodedToken = verify(token, process.env.SECRET) as TokenPayload;

		request.user = {
			userId: decodedToken.userId,
			email: decodedToken.email,
		};

		return next();
	} catch (error) {
		throw new AppError('Invalid JWT token');
	}
}
