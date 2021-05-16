import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

// CONTROLLER
import ProductController from '../controllers/productController';

const productRouter = Router();
const productController = ProductController;

productRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			price: Joi.number().precision(2).required(),
			quantity: Joi.number().required(),
		},
	}),
	productController.createProduct,
);

productRouter.put(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
		[Segments.BODY]: {
			name: Joi.string(),
			price: Joi.number().precision(2),
			quantity: Joi.number(),
		},
	}),
	productController.updateProduct,
);

productRouter.get('/', productController.findAllProducts);

productRouter.get(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	productController.findById,
);

productRouter.delete(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	productController.removeProduct,
);

export default productRouter;
