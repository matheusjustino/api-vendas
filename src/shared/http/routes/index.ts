import { Router } from 'express';

// ROUTES
import productRouter from '@modules/products/routes/product.routes';
import userRouter from '@modules/users/routes/userRoutes';
import sessionRouter from '@modules/users/routes/sessionRoutes';

// MIDDLEWARES
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const routes = Router();

routes.use('/products', isAuthenticated, productRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);

export default routes;
