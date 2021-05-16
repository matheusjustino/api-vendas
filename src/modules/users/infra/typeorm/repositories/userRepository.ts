import { getRepository, Repository } from 'typeorm';

// INTERFACES
import { IUser } from '@modules/users/domain/models/IUser';
import { ICreateUser } from '../../../domain/models/ICreateUser';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import User from '../entities/user.entity';

class UserRepository implements IUserRepository {
	private readonly userRepository: Repository<User>;

	constructor() {
		this.userRepository = getRepository(User);
	}

	public async findByName(name: string): Promise<IUser | undefined> {
		const user = await this.userRepository.findOne({
			where: {
				name,
			},
		});

		return user;
	}

	public async findById(userId: string): Promise<IUser | undefined> {
		const user = await this.userRepository.findOne({
			where: {
				id: userId,
			},
		});

		return user;
	}

	public async findByEmail(email: string): Promise<IUser | undefined> {
		const user = await this.userRepository.findOne({
			where: {
				email,
			},
		});

		return user;
	}

	public createQueryBuilder() {
		return this.userRepository.createQueryBuilder();
	}

	public async create(data: ICreateUser): Promise<IUser> {
		const user = this.userRepository.create(data);

		await this.userRepository.save(user);

		return user;
	}

	public async save(user: IUser): Promise<IUser> {
		await this.userRepository.save(user);

		return user;
	}
}

export default UserRepository;
