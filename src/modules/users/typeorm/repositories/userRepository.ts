import { EntityRepository, getRepository, Repository } from 'typeorm';

// ENTITIES
import User from '../entities/user.entity';

@EntityRepository(User)
class UserRepository extends Repository<User> {
	private readonly userRepository: Repository<User>;

	constructor() {
		super();
		this.userRepository = getRepository(User);
	}

	public async findByName(name: string): Promise<User | undefined> {
		const user = await this.userRepository.findOne({
			where: {
				name,
			},
		});

		return user;
	}

	public async findById(userId: string): Promise<User | undefined> {
		const user = await this.userRepository.findOne({
			where: {
				id: userId,
			},
		});

		return user;
	}

	public async findByEmail(email: string): Promise<User | undefined> {
		const user = await this.userRepository.findOne({
			where: {
				email,
			},
		});

		return user;
	}
}

export default UserRepository;
