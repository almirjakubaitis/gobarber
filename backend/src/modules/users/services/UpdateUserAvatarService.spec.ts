// import 'reflect-metadata';
// test('sum two numbers', () => {
//   expect(1 + 2).toBe(3);
// });

import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import UpdateUserAvatarService from './UpdateUserAvatarService';

// describe('categoria de testes')

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatarService: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to create a new user', async () => {
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

  it('should not be able to update a avatar from non existing user', async () => {
    expect(
      updateUserAvatarService.execute({
        user_id: 'id nao existente',
        avatarFilename: 'filename.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // /

  it('should be able to delete old avatar when updating a new one', async () => {
    const deleFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

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
