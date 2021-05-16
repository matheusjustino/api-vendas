import { getRepository, Repository, In } from 'typeorm';

// INTERFACES
import { IOrderProduct } from '@modules/orders/domain/models/IOrderProduct';
import { IProduct } from '@modules/products/domain/models/IProduct';
import { IProductRepository } from '@modules/products/domain/repositories/IProductRepository';
import { ICreateProduct } from '../../../domain/models/ICreateProduct';
import Product from '../entities/product.entity';

class ProductRepository implements IProductRepository {
	private readonly productRepository: Repository<Product>;

	constructor() {
		this.productRepository = getRepository(Product);
	}

	public async findByName(name: string): Promise<IProduct | undefined> {
		const product = await this.productRepository.findOne({
			where: {
				name,
			},
		});

		return product;
	}

	public async findAllByIds(products: IOrderProduct[]): Promise<IProduct[]> {
		const productsId = products.map((product) => product.product_id);

		const productsExists = await this.productRepository.find({
			where: {
				id: In(productsId),
			},
		});

		return productsExists;
	}

	public async create(data: ICreateProduct): Promise<IProduct> {
		const product = this.productRepository.create(data);

		await this.productRepository.save(product);

		return product;
	}

	public async save(data: IProduct): Promise<IProduct> {
		await this.productRepository.save(data);

		return data;
	}

	public async find(): Promise<IProduct[]> {
		const products = await this.productRepository.find();

		return products;
	}

	public async findById(id: string): Promise<IProduct | undefined> {
		const product = await this.productRepository.findOne({
			where: {
				id,
			},
		});

		return product;
	}

	public async remove(product: IProduct): Promise<void> {
		await this.productRepository.remove(product);
	}
}

export default ProductRepository;
