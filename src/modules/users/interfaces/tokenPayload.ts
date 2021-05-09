interface TokenPayload {
	iat: number;
	exp: number;
	userId: string;
	email: string;
	sub: string;
}

export default TokenPayload;
