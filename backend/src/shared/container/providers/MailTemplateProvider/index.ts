import { container } from 'tsyringe';

import IMailTemplateProvider from '@providers/MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from '@providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProviders';

const providers = {
  handlebars: new HandlebarsMailTemplateProvider(),
};

container.registerInstance<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
);
