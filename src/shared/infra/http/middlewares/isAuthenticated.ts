import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import { ITokenPayload } from '@modules/users/domain/models/ITokenPayload';

export default function isAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction,
) {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		throw new AppError('JWT token is missing');
	}

	const [, token] = authHeader.split(' ');

	try {
		const decodedToken = verify(token, process.env.SECRET) as ITokenPayload;

		request.user = {
			userId: decodedToken.userId,
			email: decodedToken.email,
		};

		return next();
	} catch (error) {
		throw new AppError('Invalid JWT token');
	}
}
