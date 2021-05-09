declare namespace Express {
	export interface Request {
		user: {
			userId: string;
			email: string;
		};
	}
}

declare namespace NodeJS {
	export interface Process {
		env: {
			SECRET: string;
			EXPIRES_IN: string;
		};
	}
}
