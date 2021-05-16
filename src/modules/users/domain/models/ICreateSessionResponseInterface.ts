import { IUser } from './IUser';

export interface ICreateSessionResponseInterface {
	user: IUser;
	token: string;
}
