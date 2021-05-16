import { Router } from 'express';

// ROUTES
import productRouter from '@modules/products/infra/http/routes/product.routes';
import userRouter from '@modules/users/infra/http/routes/userRoutes';
import sessionRouter from '@modules/users/infra/http/routes/sessionRoutes';
import passwordRouter from '@modules/users/infra/http/routes/passwordRoutes';
import customerRouter from '@modules/customers/infra/http/routes/customerRoutes';
import orderRouter from '@modules/orders/infra/http/routes/orderRoutes';

// MIDDLEWARES
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';

const routes = Router();

routes.use('/products', isAuthenticated, productRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);
routes.use('/password', passwordRouter);
routes.use('/customers', isAuthenticated, customerRouter);
routes.use('/orders', isAuthenticated, orderRouter);

export default routes;
