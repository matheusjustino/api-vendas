import Order from '../typeorm/entities/order.entity';

export default interface OrderPaginate {
	from: number;
	to: number;
	per_page: number;
	total: number;
	current_page: number;
	prev_page: number | null;
	next_page: number | null;
	data: Order[];
}
