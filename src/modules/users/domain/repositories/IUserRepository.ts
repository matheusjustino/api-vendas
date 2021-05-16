import { SelectQueryBuilder } from 'typeorm';

import { ICreateUser } from '../models/ICreateUser';
import { IUser } from '../models/IUser';

export interface IUserRepository {
	findByName(name: string): Promise<IUser | undefined>;
	findById(userId: string): Promise<IUser | undefined>;
	findByEmail(email: string): Promise<IUser | undefined>;
	create(data: ICreateUser): Promise<IUser>;
	save(user: IUser): Promise<IUser>;
	createQueryBuilder(): SelectQueryBuilder<IUser>;
}
