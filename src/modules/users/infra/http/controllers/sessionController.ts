import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SessionService from '../../../services/sessionService';
import CreateSessionDto from '../../../dtos/createSessionDto';

class SessionController {
	public async createSession(request: Request, response: Response) {
		try {
			const sessionService = container.resolve(SessionService);

			const createSessionDto: CreateSessionDto = request.body;
			const session = await sessionService.createSession(
				createSessionDto,
			);

			return response.json(session);
		} catch (error) {
			response.json(error);
		}
	}
}

const sessionController = new SessionController();

export default sessionController;
