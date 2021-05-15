import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

// REPOSITORIES
import OrdersRepository from '../typeorm/repositories/ordersRepository';
import CustomerRepository from '@modules/customers/typeorm/repositores/customerRepository';
import ProductRepository from '@modules/products/typeorm/repositories/productsRepository';

// DTO'S
import CreateOrderDto from '../dtos/createOrderDto';

class OrderService {
	private ordersRepository: OrdersRepository;
	private customerRepository: CustomerRepository;
	private productRepository: ProductRepository;

	constructor() {
		this.ordersRepository = getCustomRepository(OrdersRepository);
		this.customerRepository = getCustomRepository(CustomerRepository);
		this.productRepository = getCustomRepository(ProductRepository);
	}

	public async createOrder(createOrderDto: CreateOrderDto) {
		const customerExists = await this.customerRepository.findById(
			createOrderDto.customer.id,
		);

		if (!customerExists) {
			throw new AppError('Customer not found');
		}

		const order = await this.ordersRepository.createOrder(createOrderDto);

		return order;
	}
}

export default OrderService;
