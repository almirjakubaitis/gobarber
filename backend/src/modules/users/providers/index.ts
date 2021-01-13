import { container } from 'tsyringe';

import IHashprovider from '@modules/users/providers/HashProvider/models/IHashProvider';
import BcryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashprovider>('HashProvider', BcryptHashProvider);
