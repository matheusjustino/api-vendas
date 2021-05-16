import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

// DTO'S
import UpdateCustomerDto from '../dtos/updateCustomerDto';

// INTERFACES
import CustomerPaginate from '../interfaces/customerPaginate';
import { ICustomerRepository } from '../domain/repositories/ICustomerRepository';
import { ICreateCustomer } from '../domain/models/ICreateCustomer';
import { ICustomer } from '../domain/models/ICustomer';

@injectable()
class CustomerService {
	constructor(
		@inject('CustomerRepository')
		private readonly customerRepository: ICustomerRepository,
	) {}

	public async createCustomer(
		createCustomerDto: ICreateCustomer,
	): Promise<ICustomer> {
		const customerEntity = await this.customerRepository.create(
			createCustomerDto,
		);

		return customerEntity;
	}

	public async findAllCustomers(): Promise<CustomerPaginate> {
		const customers = await this.customerRepository
			.createQueryBuilder()
			.paginate();

		return customers as CustomerPaginate;
	}

	public async findById(customerId: string): Promise<ICustomer> {
		const customer = await this.customerRepository.findById(customerId);

		if (!customer) {
			throw new AppError('Customer not found');
		}

		return customer;
	}

	public async findByEmail(email: string): Promise<ICustomer> {
		const customer = await this.customerRepository.findByEmail(email);

		if (!customer) {
			throw new AppError('Customer not found');
		}

		return customer;
	}

	public async updateCustomer(
		customerId: string,
		updateCustomerDto: UpdateCustomerDto,
	): Promise<ICustomer> {
		const customer = await this.customerRepository.findById(customerId);

		if (!customer) {
			throw new AppError('Customer not found');
		}

		const updatedCustomer = await this.customerRepository.create({
			...customer,
			...updateCustomerDto,
		});

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
