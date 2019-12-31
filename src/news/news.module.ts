import { Module, HttpModule, MiddlewareConsumer } from '@nestjs/common';
import { NewsController } from './news.controller';
import { GuardiaNewsService } from './guardianews.service';
import { ConfigModule } from '@nestjs/config';
import { NYTNewsService } from './nytnews.service';
import { NewsMiddleware } from './news.middleware';
import { NewsAPIService } from './newsapi.service';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [NewsController],
  providers: [GuardiaNewsService, NYTNewsService, NewsAPIService],
})
export class NewsModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(NewsMiddleware).forRoutes('news');
  }
}
