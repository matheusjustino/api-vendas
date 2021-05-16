import 'reflect-metadata';
import { configOptions } from '@config/appConfig';
require('dotenv').config({ path: configOptions.envFilePath });
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { errors } from 'celebrate';
import { pagination } from 'typeorm-pagination';
import { createConnection } from 'typeorm';
import '@shared/container';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import multerConfig from '@config/multer';
import rateLimiter from '@shared/infra/http/middlewares/rateLimiter';
import LogRoutes from './middlewares/logRoutes';

async function main() {
	const connection = await createConnection();

	if (connection.isConnected) {
		const PORT = process.env.PORT || 3333;
		const app = express();

		app.use(cors());
		app.use(express.json());
		app.use(rateLimiter);
		app.use(pagination);
		app.use(LogRoutes),
			app.use('/files', express.static(multerConfig.directory));
		app.use(routes);
		app.use(errors());
		app.use(
			(
				error: Error,
				request: Request,
				response: Response,
				next: NextFunction,
			) => {
				console.log('error => ', error);
				if (error instanceof AppError) {
					return response.status(error.statusCode).json({
						status: 'error',
						message: error.message,
					});
				}

				return response.status(500).json({
					status: 'error',
					message: 'Internal Server Error',
				});
			},
		);

		app.listen(PORT, () => {
			console.log(`Server is listen on ${PORT}! 🎈😎👍`); // windows + . para emojis
		});

		//  docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
	} else {
		throw new AppError('Internal Server Error', 500);
	}
}
main();
