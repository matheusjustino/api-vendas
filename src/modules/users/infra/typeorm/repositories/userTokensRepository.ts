import { getRepository, Repository } from 'typeorm';
import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository';

// ENTITIES
import UserToken from '../entities/userToken.entity';

// INTERFACES
import { IUserToken } from '@modules/users/domain/models/IUserToken';

class UserTokensRepository implements IUserTokensRepository {
	private readonly userTokensRepository: Repository<IUserToken>;

	constructor() {
		this.userTokensRepository = getRepository(UserToken);
	}

	public async findByToken(token: string): Promise<IUserToken | undefined> {
		const userToken = await this.userTokensRepository.findOne({
			where: {
				token,
			},
		});

		return userToken;
	}

	public async generateToken(
		userId: string,
	): Promise<IUserToken | undefined> {
		const userToken = await this.userTokensRepository.create({
			user_id: userId,
		});

		await this.userTokensRepository.save(userToken);

		return userToken;
	}
}

export default UserTokensRepository;
