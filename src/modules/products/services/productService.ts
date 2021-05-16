import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/redisCache';

// DTO's
import CreateProductDto from '../dtos/createProductDto';
import UpdateProductDto from '../dtos/updateProductDto';

// REPOSITORIES
import ProductRepository from '../typeorm/repositories/productsRepository';

// ENTITIES
import Product from '../typeorm/entities/product.entity';

// INTERFACES
import ProductPaginate from '../interfaces/productPaginate';

class ProductService {
	private productsRepository: ProductRepository;
	private redisCache: RedisCache;

	constructor() {
		this.productsRepository = getCustomRepository(ProductRepository);
		this.redisCache = new RedisCache();
	}
	public async createProduct({
		name,
		price,
		quantity,
	}: CreateProductDto): Promise<Product> {
		const productExists = await this.productsRepository.findByName(name);

		if (productExists) {
			throw new AppError('There is already one product with this name');
		}

		const product = this.productsRepository.create({
			name,
			price,
			quantity,
		});

		// invalidando cache antes adicionar novos produtos ao banco
		await this.redisCache.invalidate('api-vendas-PRODUCT_LIST');

		await this.productsRepository.save(product);

		return product;
	}

	public async findAllProducts(): Promise<Product[]> {
		let products = await this.redisCache.recover<Product[]>(
			'api-vendas-PRODUCT_LIST',
		);

		if (!products) {
			products = await this.productsRepository.find();

			await this.redisCache.save('api-vendas-PRODUCT_LIST', products);
		}

		return products;
	}

	public async findById(productId: string): Promise<Product> {
		const product = await this.productsRepository.findOne(productId);

		if (!product) {
			throw new AppError('Product not found');
		}

		return product;
	}

	public async updateProduct(
		productId: string,
		updateProductDto: UpdateProductDto,
	) {
		const product = await this.productsRepository.findOne(productId);

		if (!product) {
			throw new AppError('Product not found');
		}

		if (updateProductDto.name) {
			const productExists = await this.productsRepository.findByName(
				updateProductDto.name,
			);

			if (productExists) {
				throw new AppError(
					'There is already one product with this name',
				);
			}
		}

		// invalidando cache antes atualizar um produto do banco
		await this.redisCache.invalidate('api-vendas-PRODUCT_LIST');

		const updatedProduct = await this.productsRepository.save({
			...product,
			...updateProductDto,
		});

		return updatedProduct;
	}

	public async removeProduct(productId: string): Promise<Product> {
		const product = await this.productsRepository.findOne(productId);

		if (!product) {
			throw new AppError('Product not found');
		}

		// invalidando cache antes remover um produto do banco
		await this.redisCache.invalidate('api-vendas-PRODUCT_LIST');

		const productRemoved = await this.productsRepository.remove(product);

		return productRemoved;
	}
}

export default ProductService;
