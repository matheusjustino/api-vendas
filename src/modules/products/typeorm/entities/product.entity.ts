import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

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

	@CreateDateColumn({ type: Date })
	public created_at: Date;

	@UpdateDateColumn({ type: Date })
	public updated_at: Date;
}

export default Product;
