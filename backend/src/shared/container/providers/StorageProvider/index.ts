import { container } from 'tsyringe';

import uploadConfig from '@config/upload';

import IStorageProvider from '@providers/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from '@providers/StorageProvider/implementations/DiskStorageProvider';
import S3StorageProvider from '@providers/StorageProvider/implementations/S3StorageProvider';

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
);
