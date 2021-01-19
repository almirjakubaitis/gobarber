// import 'reflect-metadata';
// test('sum two numbers', () => {
//   expect(1 + 2).toBe(3);
// });

import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

// describe('categoria de testes')

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'My Name',
      email: 'myemail@google.com',
      password: '123456',
    });

    // expect(appointment.id).toBe('039390-he3009');

    expect(user).toHaveProperty('id');
  });

  //

  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'My Name',
      email: 'myemail@google.com',
      password: '123456',
    });

    // expect(appointment.id).toBe('039390-he3009');

    await expect(
      createUser.execute({
        name: 'My Name',
        email: 'myemail@google.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
