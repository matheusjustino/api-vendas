import { getRepository, Repository } from 'typeorm';

// INTERFACES
import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository';

// ENTITIES
import Customer from '../entities/customer.entity';

class CustomerRepository implements ICustomerRepository {
	private readonly customerRepository: Repository<ICustomer>;

	constructor() {
		this.customerRepository = getRepository(Customer);
	}

	public async create({ name, email }: ICreateCustomer): Promise<ICustomer> {
		const customer = await this.customerRepository.create({ name, email });
		await this.customerRepository.save(customer);

		return customer;
	}

	public async save(customer: ICustomer): Promise<ICustomer> {
		await this.customerRepository.save(customer);

		return customer;
	}

	public async remove(customer: ICustomer): Promise<ICustomer> {
		await this.customerRepository.remove(customer);
		return customer;
	}

	public createQueryBuilder() {
		return this.customerRepository.createQueryBuilder();
	}

	public async findByName(name: string): Promise<ICustomer | undefined> {
		const user = await this.customerRepository.findOne({
			where: {
				name,
			},
		});

		return user;
	}

	public async findById(customerId: string): Promise<ICustomer | undefined> {
		const user = await this.customerRepository.findOne({
			where: {
				id: customerId,
			},
		});

		return user;
	}

	public async findByEmail(email: string): Promise<ICustomer | undefined> {
		const user = await this.customerRepository.findOne({
			where: {
				email,
			},
		});

		return user;
	}
}

export default CustomerRepository;
