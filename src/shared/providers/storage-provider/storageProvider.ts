import DiskStorageProvider from './diskStorageProvider';
import S3StorageProvider from './s3StorageProvider';

class StorageProvider {
	private storageProvider: DiskStorageProvider | S3StorageProvider;

	public get getStorageProvider(): DiskStorageProvider | S3StorageProvider {
		if (process.env.NODE_ENV === 'production') {
			if (this.storageProvider) {
				return this.storageProvider;
			} else {
				this.storageProvider = new S3StorageProvider();
				return this.storageProvider;
			}
		} else {
			if (this.storageProvider) {
				return this.storageProvider;
			} else {
				this.storageProvider = new DiskStorageProvider();
				return this.storageProvider;
			}
		}
	}
}

export default StorageProvider;
