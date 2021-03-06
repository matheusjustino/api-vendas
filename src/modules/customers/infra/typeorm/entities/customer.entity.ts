import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

// INTERFACES
import { ICustomer } from '@modules/customers/domain/models/ICustomer';

@Entity('customers')
class Customer implements ICustomer {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column({ type: String })
	public name: string;

	@Column({ type: String, unique: true })
	public email: string;

	@CreateDateColumn({ type: Date })
	public created_at: Date;

	@UpdateDateColumn({ type: Date })
	public updated_at: Date;
}

export default Customer;
