import fs from 'fs';
import path from 'path';
import multer from '@config/multer';

class DiskStorageProvider {
	public async saveFile(file: string): Promise<string> {
		console.log('file: ', file);
		await fs.promises.rename(
			path.resolve(multer.tempFolder, file),
			path.resolve(multer.directory, file),
		);

		return file;
	}

	public async deleteFile(file: string): Promise<void> {
		const filePath = path.resolve(multer.directory, file);

		try {
			await fs.promises.stat(filePath);
		} catch (error) {
			return;
		}

		await fs.promises.unlink(filePath);
	}
}

export default DiskStorageProvider;
