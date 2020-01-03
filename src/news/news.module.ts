import { Module, HttpModule, MiddlewareConsumer } from '@nestjs/common';
import { NewsController } from './news.controller';
import { GuardiaNewsService } from './services/strategies/guardianews.service';
import { ConfigModule } from '@nestjs/config';
import { NYTNewsService } from './services/strategies/nytnews.service';
import { NewsMiddleware } from './news.middleware';
import { NewsAPIService } from './services/strategies/newsapi.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import { NewsRepository } from './repositories/newsRepository';
import { NewsService } from './services/news.service';
import { StrategyContext } from './services/searchStrategyContext';

@Module({
  imports: [ConfigModule, HttpModule, TypeOrmModule.forFeature([News, NewsRepository])],
  controllers: [NewsController],
  providers: [GuardiaNewsService, NYTNewsService, NewsAPIService, NewsService, StrategyContext],
  exports: [TypeOrmModule],
})
export class NewsModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(NewsMiddleware).forRoutes('news');
  }
}
