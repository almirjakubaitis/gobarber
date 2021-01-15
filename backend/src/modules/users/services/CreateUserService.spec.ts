// import 'reflect-metadata';
// test('sum two numbers', () => {
//   expect(1 + 2).toBe(3);
// });

import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

// describe('categoria de testes')

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'My Name',
      email: 'myemail@google.com',
      password: '123456',
    });

    // expect(appointment.id).toBe('039390-he3009');

    expect(user).toHaveProperty('id');
  });
});

describe('CreateUser', () => {
  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

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
