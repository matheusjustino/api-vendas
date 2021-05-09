import { Request, Response } from 'express';
import { getConnectionManager } from 'typeorm';
import AppError from '@shared/errors/AppError';

// DTO's
import CreateProductDto from '../dtos/createProductDto';
import UpdateProductDto from '../dtos/updateProductDto';

// SERVICES
import ProductService from '../services/productService';

class ProductController {
	// private productService: ProductService = new ProductService();

	constructor() {
		console.log(getConnectionManager());
	}

	public async createProduct(
		request: Request,
		response: Response,
	): Promise<Response> {
		try {
			const productService = new ProductService();

			const body: CreateProductDto = request.body;
			const product = await productService.createProduct(body);

			if (!product) {
				throw new AppError('Bad Request');
			}

			return response.json(product);
		} catch (error) {
			console.log(error);
			return response.send(error);
		}
	}

	public async updateProduct(
		request: Request,
		response: Response,
	): Promise<Response> {
		try {
			const productService = new ProductService();

			const { id } = request.params;
			const body: UpdateProductDto = request.body;
			const product = await productService.updateProduct(id, body);

			return response.json(product);
		} catch (error) {
			console.log(error);
			return response.send(error);
		}
	}

	public async findAllProducts(
		request: Request,
		response: Response,
	): Promise<Response> {
		try {
			const productService = new ProductService();

			const products = await productService.findAllProducts();

			return response.json(products);
		} catch (error) {
			console.log(error);
			return response.send(error);
		}
	}

	public async findById(
		request: Request,
		response: Response,
	): Promise<Response> {
		try {
			const productService = new ProductService();

			const { id } = request.params;
			const product = await productService.findById(id);

			return response.json(product);
		} catch (error) {
			console.log(error);
			return response.send(error);
		}
	}

	public async removeProduct(request: Request, response: Response) {
		try {
			const productService = new ProductService();

			const { id } = request.params;
			const product = await productService.removeProduct(id);

			return response.json(product);
		} catch (error) {
			console.log(error);
			return response.send(error);
		}
	}
}

const productController = new ProductController();

export default productController;
