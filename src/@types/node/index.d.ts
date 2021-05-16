declare namespace NodeJS {
	export interface Process {
		env: {
			SECRET: string;
			EXPIRES_IN: string;
			PORT: number;
			NODE_ENV: string;
			APP_EMAIL_URL: string;
			APP_API_URL: string;
			REDIS_HOST: string;
			REDIS_PORT: number;
			REDIS_PASS: string;
			S3_BUCKET: string;
			S3_REGION: string;
			S3_ACCESS_KEY: string;
			S3_PRIVATE_KEY: string;
			STORAGE_DRIVER: string;
		};
	}
}
