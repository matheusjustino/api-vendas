import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';
import { IUser } from '@modules/users/domain/models/IUser';

@Entity('users')
class User implements IUser {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column({ type: String })
	public name: string;

	@Column({ type: String, unique: true })
	public email: string;

	@Column({ type: String })
	@Exclude()
	public password: string;

	@Column({ type: String, nullable: true })
	public avatar: string;

	@CreateDateColumn({ type: Date })
	public created_at: Date;

	@UpdateDateColumn({ type: Date })
	public updated_at: Date;

	@Expose({ name: 'avatar_url' })
	public getAvatarUrl(): string | null {
		if (!this.avatar) {
			return null;
		} else {
			return `${process.env.APP_API_URL}/files/${this.avatar}`;
		}
	}
}

export default User;
