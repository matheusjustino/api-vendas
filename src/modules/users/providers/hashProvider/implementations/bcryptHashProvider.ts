import { hash, compare } from 'bcryptjs';

// INTERFACES
import { IHashProvider } from '../models/IHashprovider';

class BcryptHashProvider implements IHashProvider {
	public async generateHash(payload: string): Promise<string> {
		return hash(payload, 10);
	}

	public async compareHash(
		payload: string,
		hashed: string,
	): Promise<boolean> {
		return compare(payload, hashed);
	}
}

export default BcryptHashProvider;
