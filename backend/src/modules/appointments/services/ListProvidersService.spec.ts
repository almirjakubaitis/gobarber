// import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListProvidersService from './ListProviderServices';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'User One',
      email: 'oneemail@google.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'User Two',
      email: 'twoemail@google.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'User Three',
      email: 'trhreeemail@google.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
