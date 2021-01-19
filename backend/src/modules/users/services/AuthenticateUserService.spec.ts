import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import CreateUserService from '@modules/users/services/CreateUserService';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
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

  //

  it('should not to be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'myemail@google.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  //

  it('should not to be able to authenticate with wrong password', async () => {
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
