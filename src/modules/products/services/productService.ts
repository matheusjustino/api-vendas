import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

// DTO's
import CreateProductDto from '../dtos/createProductDto';
import UpdateProductDto from '../dtos/updateProductDto';

// REPOSITORIES
import ProductRepository from '../typeorm/repositories/productsRepository';

// ENTITIES
import Product from '../typeorm/entities/product.entity';

class ProductService {
	private productsRepository: ProductRepository;

	constructor() {
		this.productsRepository = getCustomRepository(ProductRepository);
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

		await this.productsRepository.save(product);

		return product;
	}

	public async findAllProducts(): Promise<Product[]> {
		const products = await this.productsRepository.find();

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

		const productRemoved = await this.productsRepository.remove(product);

		return productRemoved;
	}
}

export default ProductService;
