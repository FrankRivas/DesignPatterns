import { EntityRepository, Repository } from 'typeorm';
import { Users } from '../entities/user.entity';
import { HttpException } from '@nestjs/common';

@EntityRepository(Users)
export class UserRepository extends Repository<Users> {
  async getUserByParam(
    param: string,
    value: string | number,
  ): Promise<Users | undefined> {
    let user: Users | undefined;
    try {
      user = await this.findOne({
        where: [{ [param]: value }],
      });
    } catch (error) {
      throw new HttpException('', error);
    }
    return user;
  }
  async getNewsFromUser(userId: number): Promise<Users | undefined> {
    let usersNews: Users | undefined;
    try {
      usersNews = await this.findOne({
        join: {
          alias: 'user',
          leftJoinAndSelect: {
            newsToUser: 'user.newsToUser',
            news: 'newsToUser.news',
          },
        },
        where: { id: userId },
      });
    } catch (error) {
      throw new HttpException('', error);
    }
    return usersNews;
  }
}
