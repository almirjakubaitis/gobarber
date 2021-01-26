// import nodemailer, { Transporter } from 'nodemailer/lib/ses-transport';
import nodemailer, { Transporter } from 'nodemailer';
import aws from 'aws-sdk';

import mailConfig from '@config/mail';

import { injectable, inject } from 'tsyringe';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailerProvider';
import ISendMailDTO from '@providers/MailProvider/dtos/ISendMailDTO';

import IMailTemplateProvider from '@providers/MailTemplateProvider/models/IMailTemplateProvider';

// Está sendo injetado um provider dentro do outro
// O MailTemplate Provider esta sendo injeado aqui
@injectable()
export default class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: 'us-east-1',
      }),
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from;

    const message = await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      // text: 'teste',
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
