import Customer from '@modules/customers/typeorm/entities/customer.entity';
import { EntityRepository, getRepository, Repository } from 'typeorm';

// DTO'S
import CreateOrderDto from '../../dtos/createOrderDto';

// ENTITIES
import Order from '../entities/order.entity';

interface CreateOrder {
	customer: Customer;
	products: Array<{
		product_id: string;
		price: number;
		quantity: number;
	}>;
}

@EntityRepository(Order)
class OrdersRepository extends Repository<Order> {
	private readonly orderRepository: Repository<Order>;

	constructor() {
		super();
		this.orderRepository = getRepository(Order);
	}

	public async findById(orderId: string): Promise<Order | undefined> {
		const order = await this.orderRepository.findOne({
			where: {
				id: orderId,
			},
			relations: ['order_products', 'customer'],
		});

		return order;
	}

	public async createOrder(createOrderDto: CreateOrder): Promise<Order> {
		const order = this.orderRepository.create({
			customer: createOrderDto.customer,
			order_products: createOrderDto.products,
		});

		await this.orderRepository.save(order);

		return order;
	}
}

export default OrdersRepository;
