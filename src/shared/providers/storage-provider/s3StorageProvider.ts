import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import mime from 'mime';

import multer from '@config/multer';

class S3StorageProvider {
	private s3Client: S3;

	constructor() {
		this.s3Client = new aws.S3({
			region: process.env.S3_REGION,
			accessKeyId: process.env.S3_ACCESS_KEY,
			secretAccessKey: process.env.S3_PRIVATE_KEY,
		});
	}

	public async saveFile(file: string): Promise<string> {
		const originalPath = path.resolve(multer.tempFolder, file);

		const ContentType = mime.getType(originalPath);

		if (!ContentType) {
			throw new Error('File not found');
		}

		const fileContent = await fs.promises.readFile(originalPath);

		await this.s3Client
			.putObject({
				Bucket: process.env.S3_BUCKET,
				Key: file,
				ACL: 'public-read',
				Body: fileContent,
				ContentType,
			})
			.promise();

		await fs.promises.unlink(originalPath);

		return file;
	}

	public async deleteFile(file: string): Promise<void> {
		await this.s3Client
			.deleteObject({
				Bucket: process.env.S3_BUCKET,
				Key: file,
			})
			.promise();
	}
}

export default S3StorageProvider;
