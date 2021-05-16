import { IUserToken } from '../models/IUserToken';

export interface IUserTokensRepository {
	findByToken(token: string): Promise<IUserToken | undefined>;
	generateToken(userId: string): Promise<IUserToken | undefined>;
}
