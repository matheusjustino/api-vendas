import { EntityRepository, getRepository, Repository } from 'typeorm';

// DTO'S
import CreateOrderDto from '../../dtos/createOrderDto';

// ENTITIES
import Order from '../entities/order.entity';

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

	public async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
		const order = this.orderRepository.create({
			customer: createOrderDto.customer,
			order_products: createOrderDto.products,
		});

		await this.orderRepository.save(order);

		return order;
	}
}

export default OrdersRepository;
