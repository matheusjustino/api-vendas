import { EntityRepository, getRepository, Repository, In } from 'typeorm';
import Product from '../entities/product.entity';

interface IProduct {
	product_id: string;
	price: number;
	quantity: number;
}

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

	public async findAllByIds(products: IProduct[]): Promise<Product[]> {
		const productsId = products.map((product) => product.product_id);

		const productsExists = await this.productRepository.find({
			where: {
				id: In(productsId),
			},
		});

		return productsExists;
	}
}

export default ProductRepository;
