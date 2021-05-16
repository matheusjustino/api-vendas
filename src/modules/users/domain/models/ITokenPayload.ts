export interface ITokenPayload {
	iat: number;
	exp: number;
	userId: string;
	email: string;
	sub: string;
}
