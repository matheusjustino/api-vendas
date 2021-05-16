import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/redisCache';

// INTERFACES
import { ICreateProduct } from '../domain/models/ICreateProduct';
import { IProduct } from '../domain/models/IProduct';
import { IUpdateProduct } from '../domain/models/IUpdateProduct';
import { IProductRepository } from '../domain/repositories/IProductRepository';

@injectable()
class ProductService {
	private redisCache: typeof RedisCache;

	constructor(
		@inject('ProductRepository')
		private readonly productsRepository: IProductRepository,
	) {
		this.redisCache = RedisCache;
	}
	public async createProduct({
		name,
		price,
		quantity,
	}: ICreateProduct): Promise<IProduct> {
		const productExists = await this.productsRepository.findByName(name);

		if (productExists) {
			throw new AppError('There is already one product with this name');
		}

		const product = await this.productsRepository.create({
			name,
			price,
			quantity,
		});

		// invalidando cache antes adicionar novos produtos ao banco
		await this.redisCache.invalidate('api-vendas-PRODUCT_LIST');

		return product;
	}

	public async findAllProducts(): Promise<IProduct[]> {
		let products = await this.redisCache.recover<IProduct[]>(
			'api-vendas-PRODUCT_LIST',
		);

		if (!products) {
			products = await this.productsRepository.find();

			await this.redisCache.save('api-vendas-PRODUCT_LIST', products);
		}

		return products;
	}

	public async findById(productId: string): Promise<IProduct> {
		const product = await this.productsRepository.findById(productId);

		if (!product) {
			throw new AppError('Product not found');
		}

		return product;
	}

	public async updateProduct(
		productId: string,
		updateProductDto: IUpdateProduct,
	) {
		const product = await this.productsRepository.findById(productId);

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

	public async removeProduct(productId: string): Promise<IProduct> {
		const product = await this.productsRepository.findById(productId);

		if (!product) {
			throw new AppError('Product not found');
		}

		// invalidando cache antes remover um produto do banco
		await this.redisCache.invalidate('api-vendas-PRODUCT_LIST');

		await this.productsRepository.remove(product);

		return product;
	}
}

export default ProductService;
