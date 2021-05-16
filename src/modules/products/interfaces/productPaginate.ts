import Product from '../infra/typeorm/entities/product.entity';

export default interface ProductPaginate {
	from: number;
	to: number;
	per_page: number;
	total: number;
	current_page: number;
	prev_page: number | null;
	next_page: number | null;
	data: Product[];
}
