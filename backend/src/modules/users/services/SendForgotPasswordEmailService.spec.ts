// import 'reflect-metadata';
// test('sum two numbers', () => {
//   expect(1 + 2).toBe(3);
// });

import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

// describe('categoria de testes')

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );

    await fakeUsersRepository.create({
      name: 'MyName',
      email: 'myemail@google.com',
      password: '123',
    });

    await sendForgotPasswordEmail.execute({
      email: 'myemail@google.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should be able to recover a non-existing user password', async () => {
    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );

    await expect(
      sendForgotPasswordEmail.execute({
        email: 'myemail@google.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );

    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'MyName',
      email: 'myemail@google.com',
      password: '123',
    });

    await sendForgotPasswordEmail.execute({
      email: 'myemail@google.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
