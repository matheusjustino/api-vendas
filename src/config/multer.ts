import multer, { StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto';

interface UploadConfig {
	tempFolder: string;
	directory: string;
	multer: {
		storage: StorageEngine;
	};
	config: {
		aws: {
			bucket: string;
		};
	};
}

const uploadFolderPath = path.resolve(__dirname, '..', '..', 'uploads');
const tempFolderPath = path.resolve(__dirname, '..', '..', 'temp');

export default {
	directory: uploadFolderPath,
	tempFolder: tempFolderPath,
	multer: {
		storage: multer.diskStorage({
			destination: tempFolderPath,
			filename(request, file, callback) {
				const filehash = crypto.randomBytes(10).toString('hex');
				const filename = `${filehash}-${file.originalname}`;

				callback(null, filename);
			},
		}),
	},
	config: {
		aws: {
			bucket: process.env.S3_BUCKET,
		},
	},
} as UploadConfig;
