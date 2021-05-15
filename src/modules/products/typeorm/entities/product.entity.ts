import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

import OrdersProducts from '@modules/orders/typeorm/entities/ordersProducts.entity';

@Entity('products')
class Product {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column({ type: String })
	public name: string;

	@Column('decimal')
	public price: number;

	@Column('int')
	public quantity: number;

	@OneToMany(() => OrdersProducts, (order_products) => order_products.product)
	public orders_products: OrdersProducts[];

	@CreateDateColumn({ type: Date })
	public created_at: Date;

	@UpdateDateColumn({ type: Date })
	public updated_at: Date;
}

export default Product;
