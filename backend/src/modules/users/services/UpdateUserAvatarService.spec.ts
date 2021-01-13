// import 'reflect-metadata';
// test('sum two numbers', () => {
//   expect(1 + 2).toBe(3);
// });

import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import UpdateUserAvatarService from './UpdateUserAvatarService';

// describe('categoria de testes')

describe('UpdateUserAvatar', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'My Name',
      email: 'myemail@google.com',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'filename.jpg',
    });

    // expect(appointment.id).toBe('039390-he3009');

    expect(user.avatar).toBe('filename.jpg');
  });
});

describe('UpdateUserAvatar', () => {
  it('should not be able to update a avatar from non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    expect(
      updateUserAvatarService.execute({
        user_id: 'id nao existente',
        avatarFilename: 'filename.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

describe('UpdateUserAvatar', () => {
  it('should be able to delete old avatar when updating a new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'My Name',
      email: 'myemail@google.com',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'filename.jpg',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'filename2.jpg',
    });

    // expect(appointment.id).toBe('039390-he3009');

    expect(deleFile).toHaveBeenCalledWith('filename.jpg');
    expect(user.avatar).toBe('filename2.jpg');
  });
});
