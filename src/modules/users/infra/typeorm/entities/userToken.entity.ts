import {
	Column,
	CreateDateColumn,
	Entity,
	Generated,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

import { IUserToken } from '../../../domain/models/IUserToken';

@Entity('user_tokens')
class UserToken implements IUserToken {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column({ type: String })
	@Generated('uuid')
	public token: string;

	@Column({ type: String })
	public user_id: string;

	@CreateDateColumn({ type: Date })
	public created_at: Date;

	@UpdateDateColumn({ type: Date })
	public updated_at: Date;
}

export default UserToken;
