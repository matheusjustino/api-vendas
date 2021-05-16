import { IOrdersProducts } from '@modules/orders/domain/models/IOrdersProducts';
import Product from '@modules/products/infra/typeorm/entities/product.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

import Order from './order.entity';

@Entity('orders_products')
class OrdersProducts implements IOrdersProducts {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column('decimal')
	public price: number;

	@Column('int')
	public quantity: number;

	@ManyToOne(() => Order, (order) => order.order_products)
	@JoinColumn({ name: 'order_id' })
	public order: Order;

	@ManyToOne(() => Product, (product) => product.orders_products)
	@JoinColumn({ name: 'product_id' })
	public product: Product;

	@Column({ type: String })
	public order_id: string;

	@Column({ type: String })
	public product_id: string;

	@CreateDateColumn({ type: Date })
	public created_at: Date;

	@UpdateDateColumn({ type: Date })
	public updated_at: Date;
}

export default OrdersProducts;
