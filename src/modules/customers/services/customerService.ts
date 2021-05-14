import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

// REPOSITORIES
import CustomerRepository from '../typeorm/repositores/customerRepository';

// ENTITIES
import Customer from '../typeorm/entities/customer.entity';

// DTO'S
import CreateCustomerDto from '../dtos/createCustomerDto';
import UpdateCustomerDto from '../dtos/updateCustomerDto';

class CustomerService {
	private customerRepository: CustomerRepository;

	constructor() {
		this.customerRepository = getCustomRepository(CustomerRepository);
	}

	public async createCustomer(
		createCustomerDto: CreateCustomerDto,
	): Promise<Customer> {
		const customerEntity = this.customerRepository.create(
			createCustomerDto,
		);

		await this.customerRepository.save(customerEntity);

		return customerEntity;
	}

	public async findAllCustomers(): Promise<Customer[]> {
		const customers = await this.customerRepository.find();

		return customers;
	}

	public async findById(customerId: string): Promise<Customer> {
		const customer = await this.customerRepository.findById(customerId);

		if (!customer) {
			throw new AppError('Customer not found');
		}

		return customer;
	}

	public async findByEmail(email: string): Promise<Customer> {
		const customer = await this.customerRepository.findByEmail(email);

		if (!customer) {
			throw new AppError('Customer not found');
		}

		return customer;
	}

	public async updateCustomer(
		customerId: string,
		updateCustomerDto: UpdateCustomerDto,
	): Promise<Customer> {
		const customer = await this.customerRepository.findById(customerId);

		if (!customer) {
			throw new AppError('Customer not found');
		}

		const updatedCustomer = this.customerRepository.create({
			...customer,
			...updateCustomerDto,
		});

		await this.customerRepository.save(updatedCustomer);

		return updatedCustomer;
	}

	public async deleteCustomer(customerId: string): Promise<void> {
		const customer = await this.customerRepository.findById(customerId);

		if (!customer) {
			throw new AppError('Customer not found');
		}

		await this.customerRepository.remove(customer);
	}
}

export default CustomerService;
