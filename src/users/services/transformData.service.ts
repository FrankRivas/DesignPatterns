import { Injectable } from '@nestjs/common';
import { NewToUser } from '../entities/usernews.entity';
import { UserSharedNewsInterface, UserNewsInterface } from '../interfaces/usernews';

@Injectable()
export class TransformDataService {
  transformDataSharedNews(userNew: NewToUser): UserSharedNewsInterface {
    const newUser = {
      shared: userNew.createdAt,
      to: userNew.user.username,
      url: userNew.news.url,
    };
    return newUser;
  }

  transformDataMyNews(userNew: NewToUser): UserNewsInterface {
    const newUser = {
      sharedBy: userNew.sharedBy,
      url: userNew.news.url,
      savedAt: userNew.news.createdAt,
    };
    return newUser;
  }
}
