import { IUser } from '../domain/models/IUser';
import User from '../infra/typeorm/entities/user.entity';

interface CreateSessionResponseInterface {
	user: IUser;
	token: string;
}

export default CreateSessionResponseInterface;
