import { SelectQueryBuilder } from 'typeorm';

// INTERFACES
import { ICreateCustomer } from '../models/ICreateCustomer';
import { ICustomer } from '../models/ICustomer';

export interface ICustomerRepository {
	findByName(name: string): Promise<ICustomer | undefined>;
	findById(customerId: string): Promise<ICustomer | undefined>;
	findByEmail(email: string): Promise<ICustomer | undefined>;
	create(data: ICreateCustomer): Promise<ICustomer>;
	save(customer: ICustomer): Promise<ICustomer>;
	remove(customer: ICustomer): Promise<ICustomer>;
	createQueryBuilder(): SelectQueryBuilder<ICustomer>;
}
