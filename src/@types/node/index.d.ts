declare namespace NodeJS {
	export interface Process {
		env: {
			SECRET: string;
			EXPIRES_IN: string;
			PORT: number;
			NODE_ENV: string;
		};
	}
}
