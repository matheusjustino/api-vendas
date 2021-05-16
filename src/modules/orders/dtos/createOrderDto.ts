import Customer from '@modules/customers/typeorm/entities/customer.entity';

class CreateOrderDto {
	public customer_id: string;

	public products: Array<{
		product_id: string;
		price: number;
		quantity: number;
	}>;
}

export default CreateOrderDto;
