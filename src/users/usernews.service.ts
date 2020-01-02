import { Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { News } from '../news/entities/news.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NewToUser } from './entities/usernews.entity';
import {
  UserNewsInterface,
  UserSharedNewsInterface,
} from './interfaces/usernews';
import { UserRepository } from './repository/userRepository';
import { NewsRepository } from 'src/news/repository/newsRepository';
import { UserNewsRepository } from './repository/userNewsRepository';

@Injectable()
export class UserNewsService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
    @InjectRepository(NewToUser)
    private readonly newsToUserRepository: Repository<NewToUser>,
    private readonly userQueryRepository: UserRepository,
    private readonly newsQueryRepository: NewsRepository,
    private readonly userNewsQueryRepository: UserNewsRepository,
  ) {}

  async saveArticle(
    url: string,
    userId: number,
    toUserId?: number,
  ): Promise<{}> {
    let user: Users | undefined;
    let news: News | undefined;
    let toUser: Users | undefined;
    try {
      user = await this.userRepository.findOne(userId);
      if (toUserId) {
        toUser = await this.userRepository.findOne(toUserId);
      }
    } catch (error) {
      throw new HttpException('', error);
    }
    if (!user || (!toUser && toUserId)) {
      throw new BadRequestException();
    }
    try {
      news = await this.newsQueryRepository.getNewsByParam('url', url);
    } catch (error) {
      throw new HttpException('', error);
    }
    if (!news) {
      const saveNew = {
        url,
      };
      try {
        news = await this.newsRepository.save(saveNew);
      } catch (error) {
        throw new HttpException('', error);
      }
    }
    const ntu = {
      news,
      user,
      sharedBy: toUserId ? toUserId : undefined,
    };
    try {
      await this.newsToUserRepository.save(ntu);
      return news;
    } catch (error) {
      throw new HttpException('', error);
    }
  }

  transformData(userNew: NewToUser): UserNewsInterface {
    const newUser = {
      sharedBy: userNew.sharedBy,
      url: userNew.news.url,
      savedAt: userNew.news.createdAt,
    };
    return newUser;
  }

  async getArticles(user: number): Promise<UserNewsInterface[] | undefined> {
    let usersNews: Users | undefined;
    try {
      usersNews = await this.userQueryRepository.getNewsFromUser(user);
    } catch (error) {
      throw new HttpException('', error);
    }
    if (!usersNews) {
      throw new BadRequestException();
    }
    return usersNews?.newsToUser.map(this.transformData);
  }

  transformSharedNews(userNew: NewToUser): UserSharedNewsInterface {
    const newUser = {
      shared: userNew.createdAt,
      to: userNew.user.username,
      url: userNew.news.url,
    };
    return newUser;
  }

  async getSharedArticles(
    user: number,
  ): Promise<UserSharedNewsInterface[] | undefined> {
    let userFromDB: Users | undefined;
    try {
      userFromDB = await this.userRepository.findOne(user);
    } catch (error) {
      throw new HttpException('', error);
    }
    if (!userFromDB) {
      throw new BadRequestException();
    }
    let usersNews: NewToUser[];
    try {
      usersNews = await this.userNewsQueryRepository.getSharedNewsFromUser(
        user,
      );
    } catch (error) {
      throw new HttpException('', error);
    }
    return usersNews.map(this.transformSharedNews);
  }
}
