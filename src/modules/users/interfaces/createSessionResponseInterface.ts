import User from '../typeorm/entities/user.entity';

interface CreateSessionResponseInterface {
	user: User;
	token: string;
}

export default CreateSessionResponseInterface;
