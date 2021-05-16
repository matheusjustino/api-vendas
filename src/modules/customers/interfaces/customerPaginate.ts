import Customer from '../infra/typeorm/entities/customer.entity';

export default interface CustomerPaginate {
	from: number;
	to: number;
	per_page: number;
	total: number;
	current_page: number;
	prev_page: number | null;
	next_page: number | null;
	data: Customer[];
}
