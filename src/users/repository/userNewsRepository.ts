import { EntityRepository, Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';
import { NewToUser } from '../entities/usernews.entity';

@EntityRepository(NewToUser)
export class UserNewsRepository extends Repository<NewToUser> {
  async getSharedNewsFromUser(userId: number): Promise<NewToUser[]> {
    let usersNews: NewToUser[];
    try {
      usersNews = await this.find({
        join: {
          alias: 'newsToUser',
          leftJoinAndSelect: {
            user: 'newsToUser.user',
            news: 'newsToUser.news',
          },
        },
        where: { sharedBy: userId },
      });
    } catch (error) {
      throw new HttpException('', error);
    }
    return usersNews;
  }
}
