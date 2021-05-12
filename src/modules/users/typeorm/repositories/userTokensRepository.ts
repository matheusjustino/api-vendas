import { EntityRepository, getRepository, Repository } from 'typeorm';

// ENTITIES
import UserToken from '../entities/userToken.entity';

@EntityRepository(UserToken)
class UserTokensRepository extends Repository<UserToken> {
	private readonly userTokensRepository: Repository<UserToken>;

	constructor() {
		super();
		this.userTokensRepository = getRepository(UserToken);
	}

	public async findByToken(token: string): Promise<UserToken | undefined> {
		const userToken = await this.userTokensRepository.findOne({
			where: {
				token,
			},
		});

		return userToken;
	}

	public async generateToken(userId: string): Promise<UserToken | undefined> {
		const userToken = await this.userTokensRepository.create({
			user_id: userId,
		});

		await this.userTokensRepository.save(userToken);

		return userToken;
	}
}

export default UserTokensRepository;
