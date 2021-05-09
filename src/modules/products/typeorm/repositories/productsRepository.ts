import { EntityRepository, getRepository, Repository } from 'typeorm';
import Product from '../entities/product.entity';

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {
	private readonly productRepository: Repository<Product>;

	constructor() {
		super();
		this.productRepository = getRepository(Product);
	}

	public async findByName(name: string): Promise<Product | undefined> {
		const product = await this.productRepository.findOne({
			where: {
				name,
			},
		});

		return product;
	}
}

export default ProductRepository;
