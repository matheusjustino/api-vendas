import { Router } from 'express';

// ROUTES
import productRouter from '@modules/products/routes/product.routes';
import userRouter from '@modules/users/routes/userRoutes';
import sessionRouter from '@modules/users/routes/sessionRoutes';
import passwordRouter from '@modules/users/routes/passwordRoutes';
import customerRouter from '@modules/customers/routes/customerRoutes';

// MIDDLEWARES
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const routes = Router();

routes.use('/products', isAuthenticated, productRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);
routes.use('/password', passwordRouter);
routes.use('/customers', isAuthenticated, customerRouter);

export default routes;
