import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

// CONTROLLER
import SessionController from '../controllers/sessionController';

const sessionRouter = Router();
const sessionController = SessionController;

sessionRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		},
	}),
	sessionController.createSession,
);

export default sessionRouter;
