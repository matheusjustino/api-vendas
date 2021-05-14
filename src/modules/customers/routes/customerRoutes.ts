import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

// CONTROLLERS
import CustomerController from '../controllers/customerController';

const customerRouter = Router();
const customerController = CustomerController;

customerRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().required(),
		},
	}),
	customerController.createCustomer,
);

customerRouter.put(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
		[Segments.BODY]: {
			name: Joi.string(),
			email: Joi.string(),
		},
	}),
	customerController.updateCustomer,
);

customerRouter.get('/', customerController.findAllCustomers);

customerRouter.get(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	customerController.findById,
);

customerRouter.delete(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	customerController.deleteCustomer,
);

export default customerRouter;
