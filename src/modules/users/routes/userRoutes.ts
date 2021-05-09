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
userRouter.patch(
	'/avatar',
	isAuthenticated,
	multerUpload.single('avatar'),
	userController.updateUserAvatar,
);
userRouter.get('/', isAuthenticated, userController.findAllUsers);
userRouter.get('/:id', isAuthenticated, userController.findUserById);

export default userRouter;
