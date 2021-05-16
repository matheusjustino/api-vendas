// INTERFACE
import { IOrderProduct } from './IOrderProduct';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';

export interface ICreateOrderDto {
	customer: ICustomer;
	products: IOrderProduct[];
}
