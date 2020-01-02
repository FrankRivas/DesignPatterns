import { Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { Users } from '../entities/user.entity';
import { News } from '../../news/entities/news.entity';
import { NewToUser } from '../entities/usernews.entity';
import {
  UserNewsInterface,
  UserSharedNewsInterface,
} from '../interfaces/usernews';
import { UserRepository } from '../repositories/userRepository';
import { NewsRepository } from 'src/news/repositories/newsRepository';
import { UserNewsRepository } from '../repositories/userNewsRepository';
import { TransformDataService } from './transformData.service';

@Injectable()
export class UserNewsService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly newsRepository: NewsRepository,
    private readonly userNewsRepository: UserNewsRepository,
    private readonly transformDataService: TransformDataService,
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
      news = await this.newsRepository.getNewsByParam('url', url);
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
    const newsToSave = {
      news,
      user,
      sharedBy: toUserId ? toUserId : undefined,
    };
    try {
      await this.userNewsRepository.save(newsToSave);
      return news;
    } catch (error) {
      throw new HttpException('', error);
    }
  }

  async getArticles(user: number): Promise<UserNewsInterface[] | undefined> {
    let usersNews: Users | undefined;
    try {
      usersNews = await this.userRepository.getNewsFromUser(user);
    } catch (error) {
      throw new HttpException('', error);
    }
    if (!usersNews) {
      throw new BadRequestException();
    }
    return usersNews?.newsToUser.map(
      this.transformDataService.transformDataMyNews,
    );
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
      usersNews = await this.userNewsRepository.getSharedNewsFromUser(user);
    } catch (error) {
      throw new HttpException('', error);
    }
    return usersNews.map(this.transformDataService.transformDataSharedNews);
  }
}
