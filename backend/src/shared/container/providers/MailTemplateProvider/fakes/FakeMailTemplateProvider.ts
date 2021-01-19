import IParseTemplateDTO from '@providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ template }: IParseTemplateDTO): Promise<string> {
    return template;
  }
}
