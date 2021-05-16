import { getRepository, Repository } from 'typeorm';

// INTERFACES
import Order from '../entities/order.entity';
import { IOrder } from '@modules/orders/domain/models/IOrder';
import { ICreateOrderDto } from '../../../domain/models/ICreateOrderDto';
import { IOrderRepository } from '../../../domain/repositories/IOrderRepository';

class OrdersRepository implements IOrderRepository {
	private readonly orderRepository: Repository<IOrder>;

	constructor() {
		this.orderRepository = getRepository(Order);
	}

	public async findById(orderId: string): Promise<IOrder | undefined> {
		const order = await this.orderRepository.findOne({
			where: {
				id: orderId,
			},
			relations: ['order_products', 'customer'],
		});

		return order;
	}

	public async createOrder(createOrderDto: ICreateOrderDto): Promise<IOrder> {
		const order = this.orderRepository.create({
			customer: createOrderDto.customer,
			order_products: createOrderDto.products,
		});

		await this.orderRepository.save(order);

		return order;
	}

	public createQueryBuilder() {
		return this.orderRepository.createQueryBuilder();
	}
}

export default OrdersRepository;
