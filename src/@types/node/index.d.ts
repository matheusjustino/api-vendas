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
			REDIS_PORT: string;
			REDIS_PASS: string;
		};
	}
}
