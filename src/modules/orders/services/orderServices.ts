import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/redisCache';

// DTO'S
import CreateOrderDto from '../dtos/createOrderDto';

// INTERFACES
import OrderPaginate from '../interfaces/orderPaginate';
import { IOrderRepository } from '../domain/repositories/IOrderRepository';
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository';
import { IProductRepository } from '@modules/products/domain/repositories/IProductRepository';

@injectable()
class OrderService {
	private redisCache: typeof RedisCache;

	constructor(
		@inject('OrderRepository')
		private readonly ordersRepository: IOrderRepository,
		@inject('CustomerRepository')
		private readonly customerRepository: ICustomerRepository,
		@inject('ProductRepository')
		private readonly productRepository: IProductRepository,
	) {
		this.redisCache = RedisCache;
	}

	public async createOrder(createOrderDto: CreateOrderDto) {
		// verifica se o cliente existe
		const customerExists = await this.customerRepository.findById(
			createOrderDto.customer_id,
		);

		if (!customerExists) {
			throw new AppError('Customer not found');
		}

		// mapeando os ids dos produtos recebidos na request
		const productsIdsDto = createOrderDto.products.map(
			(product) => product.product_id,
		);
		// verifica se os produtos da request existem
		const productsExists = await this.productRepository.findAllByIds(
			createOrderDto.products,
		);

		if (!productsExists.length) {
			throw new AppError('Products not found');
		}

		// mapeando os ids dos produtos existentes
		const productsExistsIds = productsExists.map((product) => product.id);
		// verifica se algum produto não existe
		const productsIdsInexistent = productsIdsDto.filter(
			(productIdDto) => !productsExistsIds.includes(productIdDto),
		);

		if (productsIdsInexistent.length) {
			throw new AppError(
				`These products do not exists: ${(() =>
					productsIdsInexistent)()}`,
			);
		}

		// verifica se a quantidade dos produtos é suficiente para a venda
		const quantityAvailable = createOrderDto.products.filter((product) => {
			return (
				productsExists.filter((p) => p.id === product.product_id)[0]
					.quantity < product.quantity
			);
		});

		if (quantityAvailable.length) {
			throw new AppError(
				`The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].product_id}`,
			);
		}

		// cria a ordem no banco
		const order = await this.ordersRepository.createOrder({
			customer: customerExists,
			products: createOrderDto.products,
		});

		const { order_products } = order;

		// cria o objeto que vai atualizar a quantidade dos produtos
		const updatedProductQuantity = order_products.map((product) => {
			const newQuantity =
				productsExists.filter((p) => p.id === product.product_id)[0]
					.quantity - product.quantity;

			return {
				id: product.product_id,
				quantity: newQuantity,
			};
		});

		// invalidando cache antes atualizar um produto do banco
		await this.redisCache.invalidate('api-vendas-PRODUCT_LIST');

		// atualiza a quantidade dos produtos no banco
		await this.productRepository.save(updatedProductQuantity as any);

		return order;
	}

	public async findAllOrders(): Promise<OrderPaginate> {
		const orders = await this.ordersRepository
			.createQueryBuilder()
			.paginate();

		return orders as OrderPaginate;
	}

	public async findOrderById(orderId: string) {
		const order = await this.ordersRepository.findById(orderId);

		if (!order) {
			throw new AppError('Order not found');
		}

		return order;
	}
}

export default OrderService;
