import { container } from 'tsyringe';

// HASH PROVIDERS
import BcryptHashProvider from '@modules/users/providers/hashProvider/implementations/bcryptHashProvider';

// INTERFACES
import { IHashProvider } from './hashProvider/models/IHashprovider';

container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);
