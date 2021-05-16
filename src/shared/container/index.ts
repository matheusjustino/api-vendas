import { container } from 'tsyringe';

// REPOSITORIES
import CustomerRepository from '@modules/customers/infra/typeorm/repositores/customerRepository';
import OrderRepository from '@modules/orders/infra/typeorm/repositories/ordersRepository';
import ProductRepository from '@modules/products/infra/typeorm/repositories/productsRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/userRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/userTokensRepository';

// INTERFACES
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository';
import { IOrderRepository } from '@modules/orders/domain/repositories/IOrderRepository';
import { IProductRepository } from '@modules/products/domain/repositories/IProductRepository';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository';

container.registerSingleton<ICustomerRepository>(
	'CustomerRepository',
	CustomerRepository,
);
container.registerSingleton<IOrderRepository>(
	'OrderRepository',
	OrderRepository,
);
container.registerSingleton<IProductRepository>(
	'ProductRepository',
	ProductRepository,
);
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IUserTokensRepository>(
	'UserTokensRepository',
	UserTokensRepository,
);
