import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const uploadFolderPath = path.resolve(__dirname, '..', '..', 'uploads');

export default {
	directory: uploadFolderPath,
	storage: multer.diskStorage({
		destination: uploadFolderPath,
		filename(request, file, callback) {
			const filehash = crypto.randomBytes(10).toString('hex');
			const filename = `${filehash}-${file.originalname}`;

			callback(null, filename);
		},
	}),
};
