import { container } from 'tsyringe';

import IStorageProvider from '@providers/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from '@providers//StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailerProvider';
import EtherealMailProvider from '@providers/MailProvider/implementations/EtherealMailProvider';

import IMailTemplateProvider from '@providers/MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from '@providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProviders';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerInstance<IMailTemplateProvider>(
  'MailTemplateProvider',
  new HandlebarsMailTemplateProvider(),
);

// precisa ser após o ImailTemplateProvider - porque está sendo injetado
container.registerInstance<IMailProvider>(
  'MailProvider',
  // new EtherealMailProvider(),
  container.resolve(EtherealMailProvider),
);
