import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

// CONTROLLERS
import OrderController from '../controllers/orderController';

const orderRouter = Router();
const orderController = OrderController;

orderRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			customer_id: Joi.string().required(),
			products: Joi.array().required(),
		},
	}),
	orderController.createOrder,
);

orderRouter.get(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	orderController.findOrderById,
);

export default orderRouter;
