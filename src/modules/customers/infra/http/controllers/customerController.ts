import { Request, Response } from 'express';
import { container } from 'tsyringe';

// DTO'S
import CreateCustomerDto from '../../../dtos/createCustomerDto';
import UpdateCustomerDto from '../../../dtos/updateCustomerDto';

// SERVICES
import CustomerService from '../../../services/customerService';

class CustomerController {
	public async createCustomer(request: Request, response: Response) {
		try {
			const customerService = container.resolve(CustomerService);
			const createCustomerDto: CreateCustomerDto = request.body;

			const user = await customerService.createCustomer(
				createCustomerDto,
			);

			return response.json(user);
		} catch (error) {
			return response.json({
				message: error.message,
				details: error.detail,
			});
		}
	}

	public async findAllCustomers(request: Request, response: Response) {
		try {
			const customerService = container.resolve(CustomerService);

			const customers = await customerService.findAllCustomers();

			return response.json(customers);
		} catch (error) {
			return response.json(error);
		}
	}

	public async findById(request: Request, response: Response) {
		try {
			const customerService = container.resolve(CustomerService);
			const { id } = request.params;

			const customer = await customerService.findById(id);

			return response.json(customer);
		} catch (error) {
			return response.json(error);
		}
	}

	public async updateCustomer(request: Request, response: Response) {
		try {
			const customerService = container.resolve(CustomerService);
			const { id } = request.params;
			const updateCustomerDto: UpdateCustomerDto = request.body;

			const updatedUser = await customerService.updateCustomer(
				id,
				updateCustomerDto,
			);

			return response.json(updatedUser);
		} catch (error) {
			return response.json({
				message: error.message,
				details: error.detail,
			});
		}
	}

	public async deleteCustomer(request: Request, response: Response) {
		try {
			const customerService = container.resolve(CustomerService);
			const { id } = request.params;

			await customerService.deleteCustomer(id);

			return response.json({ message: 'Customer removed' });
		} catch (error) {
			return response.json(error);
		}
	}
}

const customerController = new CustomerController();

export default customerController;
