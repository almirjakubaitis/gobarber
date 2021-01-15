// import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();
  });

  it('should be able to reset a user password', async () => {
    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'MyName',
      email: 'myemail@google.com',
      password: '123',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.execute({
      password: '123321',
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenLastCalledWith('123321');
    expect(updatedUser?.password).toBe('123321');
  });

  it('should be able to reset a user password with a non-existing token', async () => {
    await expect(
      resetPassword.execute({
        password: 'password',
        token: 'invalid token',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to reset a user password with a non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-existing-user',
    );

    await expect(
      resetPassword.execute({
        password: 'password',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to reset a user password if token is older than 2 hours', async () => {
    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'MyName',
      email: 'myemail@google.com',
      password: '123',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.execute({
      password: '123321',
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenLastCalledWith('123321');
    expect(updatedUser?.password).toBe('123321');
  });
});
