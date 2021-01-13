import 'reflect-metadata';
// test('sum two numbers', () => {
//   expect(1 + 2).toBe(3);
// });

import AppError from '@shared/errors/AppError';
import CreateUserService from '@modules/users/services/CreateUserService';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import AuthenticateUserService from './AuthenticateUserService';

// describe('categoria de testes')

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      name: 'My Name',
      email: 'myemail@google.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'myemail@google.com',
      password: '123456',
    });

    // expect(appointment.id).toBe('039390-he3009');

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
});

describe('AuthenticateUser', () => {
  it('should not to be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await expect(
      authenticateUser.execute({
        email: 'myemail@google.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

describe('AuthenticateUser', () => {
  it('should not to be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUserService.execute({
      name: 'My Name',
      email: 'myemail@google.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'myemail@google.com',
        password: '123456aaaa',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
