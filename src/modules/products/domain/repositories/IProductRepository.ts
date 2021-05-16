import { ICreateProduct } from '../models/ICreateProduct';
import { IProduct } from '../models/IProduct';
import { IOrderProduct } from '@modules/orders/domain/models/IOrderProduct';

export interface IProductRepository {
	findByName(name: string): Promise<IProduct | undefined>;
	findAllByIds(products: IOrderProduct[]): Promise<IProduct[]>;
	create(data: ICreateProduct): Promise<IProduct>;
	save(product: IProduct): Promise<IProduct>;
	find(): Promise<IProduct[]>;
	findById(productId: string): Promise<IProduct | undefined>;
	remove(product: IProduct): Promise<void>;
}
