import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';

// MULTER CONFIG
import multerConfig from '@config/multer';

// CONTROLLER
import UserController from '../controllers/userController';

// MIDDLEWARE
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const userRouter = Router();
const userController = UserController;
const multerUpload = multer(multerConfig);

userRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().required(),
			avatar: Joi.string(),
		},
	}),
	userController.createUser,
);

userRouter.put(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
		[Segments.BODY]: {
			name: Joi.string(),
			email: Joi.string().email(),
			oldPassword: Joi.string(),
			password: Joi.string().optional(),
			passwordConfirmation: Joi.string()
				.valid(Joi.ref('password'))
				.when('password', {
					is: Joi.exist(),
					then: Joi.required(),
				}),
		},
	}),
	isAuthenticated,
	userController.updateUser,
);

userRouter.patch(
	'/avatar',
	isAuthenticated,
	multerUpload.single('avatar'),
	userController.updateUserAvatar,
);

userRouter.get('/', isAuthenticated, userController.findAllUsers);
userRouter.get(
	'/:id',
	isAuthenticated,
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	userController.findUserById,
);

export default userRouter;
