import {
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

import Customer from '@modules/customers/infra/typeorm/entities/customer.entity';
import OrdersProducts from './ordersProducts.entity';
import { IOrder } from '@modules/orders/domain/models/IOrder';

@Entity('orders')
class Order implements IOrder {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@ManyToOne(() => Customer)
	@JoinColumn({ name: 'customer_id' })
	public customer: Customer;

	@OneToMany(() => OrdersProducts, (order_products) => order_products.order, {
		cascade: true,
	})
	public order_products: OrdersProducts[];

	@CreateDateColumn({ type: Date })
	public created_at: Date;

	@UpdateDateColumn({ type: Date })
	public updated_at: Date;
}

export default Order;
