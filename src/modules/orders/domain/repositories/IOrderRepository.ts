import { SelectQueryBuilder } from 'typeorm';
// INTERFACES
import { ICreateOrderDto } from '../models/ICreateOrderDto';
import { IOrder } from '../models/IOrder';

export interface IOrderRepository {
	findById(orderId: string): Promise<IOrder | undefined>;
	createOrder(data: ICreateOrderDto): Promise<IOrder>;
	createQueryBuilder(): SelectQueryBuilder<IOrder>;
}
