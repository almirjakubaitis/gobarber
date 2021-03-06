import IMailProvider from '@shared/container/providers/MailProvider/models/IMailerProvider';
import ISendMailDTO from '@providers/MailProvider/dtos/ISendMailDTO';

export default class FakeMailProvider implements IMailProvider {
  private messages: ISendMailDTO[] = [];

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.messages.push(message);
  }
}
