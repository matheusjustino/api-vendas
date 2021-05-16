import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

// CONTROLLER
import ForgotPasswordController from '../controllers/forgotPasswordController';

const passwordRouter = Router();
const forgotPasswordController = ForgotPasswordController;

passwordRouter.post(
	'/forgot',
	celebrate({
		[Segments.BODY]: {
			email: Joi.string().email().required(),
		},
	}),
	forgotPasswordController.createToken,
);

passwordRouter.post(
	'/reset',
	celebrate({
		[Segments.BODY]: {
			token: Joi.string().uuid().required(),
			password: Joi.string().required(),
			password_confirmation: Joi.string()
				.required()
				.valid(Joi.ref('password')),
		},
	}),
	forgotPasswordController.resetPassword,
);

export default passwordRouter;
