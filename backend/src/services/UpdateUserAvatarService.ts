import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersReporitory = getRepository(User);

    const user = await usersReporitory.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      // Deletar avatar se ele existir

      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      // a função stat trás o status de um arquivo, mas somente se ele existir

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
        // console.log(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersReporitory.save(user);
    // Método save serve tanto para criar quanto para atualizar uma informação alterada

    return user;
  }
}

export default UpdateUserAvatarService;
