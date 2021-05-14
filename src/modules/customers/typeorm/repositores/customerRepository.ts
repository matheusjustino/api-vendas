import { EntityRepository, getRepository, Repository } from 'typeorm';

// ENTITIES
import Customer from '../entities/customer.entity';

@EntityRepository(Customer)
class CustomerRepository extends Repository<Customer> {
	private readonly customerRepository: Repository<Customer>;

	constructor() {
		super();
		this.customerRepository = getRepository(Customer);
	}

	public async findByName(name: string): Promise<Customer | undefined> {
		const user = await this.customerRepository.findOne({
			where: {
				name,
			},
		});

		return user;
	}

	public async findById(customerId: string): Promise<Customer | undefined> {
		const user = await this.customerRepository.findOne({
			where: {
				id: customerId,
			},
		});

		return user;
	}

	public async findByEmail(email: string): Promise<Customer | undefined> {
		const user = await this.customerRepository.findOne({
			where: {
				email,
			},
		});

		return user;
	}
}

export default CustomerRepository;
