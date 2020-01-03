import { EntityRepository, Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';
import { News } from '../entities/news.entity';

@EntityRepository(News)
export class NewsRepository extends Repository<News> {
  async getNewsByParam(param: string, value: string | number): Promise<News | undefined> {
    let news: News | undefined;
    try {
      news = await this.findOne({
        where: [{ [param]: value }],
      });
    } catch (error) {
      throw new HttpException('', error);
    }
    return news;
  }
}
