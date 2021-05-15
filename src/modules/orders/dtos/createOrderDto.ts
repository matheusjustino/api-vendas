import Customer from '@modules/customers/typeorm/entities/customer.entity';

class CreateOrderDto {
	public customer: Customer;

	public products: Array<{
		product_id: string;
		price: number;
		quantity: number;
	}>;
}

export default CreateOrderDto;
