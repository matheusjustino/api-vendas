import { Request, Response, NextFunction } from 'express';

export default function LogRoutes(
	request: Request,
	response: Response,
	next: NextFunction,
) {
	const { method, url } = request;
	const route = `REQUEST => [${method.toUpperCase()}] ${
		process.env.APP_API_URL
	}/${url}`;

	console.log(route);

	next();
}
