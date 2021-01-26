import { container } from 'tsyringe';

import IStorageProvider from '@providers/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from '@providers//StorageProvider/implementations/DiskStorageProvider';

const providers = {
  disk: DiskStorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers.disk,
);
