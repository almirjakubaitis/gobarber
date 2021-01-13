import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

// CDN
// Content Delivery Network
// Amazon S3 / Google cloud storage / Do spaces

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      // Deletar avatar se ele existir

      await this.storageProvider.deleteFile(user.avatar);

      // codigo anterior
      // const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      // const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      // a função stat trás o status de um arquivo, mas somente se ele existir

      // if (userAvatarFileExists) {
      //   await fs.promises.unlink(userAvatarFilePath);
      //   // console.log(userAvatarFilePath);
      // }
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = filename;

    await this.usersRepository.save(user);
    // Método save serve tanto para criar quanto para atualizar uma informação alterada

    return user;
  }
}

export default UpdateUserAvatarService;
