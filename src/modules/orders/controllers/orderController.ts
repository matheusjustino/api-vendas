import { Request, Response } from 'express';

// SERVICES
import OrderService from '../services/orderServices';

// DTO'S
import CreateOrderDto from '../dtos/createOrderDto';

class OrderController {
	public async createOrder(request: Request, response: Response) {
		try {
			const orderService = new OrderService();
			const createOrderDto: CreateOrderDto = request.body;

			const order = await orderService.createOrder(createOrderDto);
			return response.json(order);
		} catch (error) {
			return response.json(error);
		}
	}

	public async findAllOrders(request: Request, response: Response) {
		try {
			const orderService = new OrderService();

			const orders = await orderService.findAllOrders();

			return response.json(orders);
		} catch (error) {
			return response.json(error);
		}
	}

	public async findOrderById(request: Request, response: Response) {
		try {
			const orderService = new OrderService();
			const { id } = request.params;

			const order = await orderService.findOrderById(id);

			return response.json(order);
		} catch (error) {
			return response.json(error);
		}
	}
}

const orderController = new OrderController();

export default orderController;
