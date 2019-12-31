import {
  Controller,
  Get,
  Query,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { GuardiaNewsService } from './guardianews.service';
import { NYTNewsService } from './nytnews.service';
import { NewsAPIService } from './newsapi.service';
import { Observable } from 'rxjs';
import { MyNews } from './interfaces/news';
import { AuthGuard } from '@nestjs/passport';
import { mergeNews } from '../utils/helpers';

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: GuardiaNewsService,
    private readonly nytnewsService: NYTNewsService,
    private readonly newsApiService: NewsAPIService,
  ) {}
  @UseGuards(AuthGuard('jwt'))
  @Get()
  search(
    @Query('searchedWord') searchedWord: string,
    @Query('searcher') searcher: string,
    @Query('page') page: string,
  ): Observable<MyNews[]> {
    let searchGuardian;
    let searchNYT;
    let searchNewsApi;
    if (searcher) {
      switch (searcher) {
        case 'nyt':
          searchNYT = this.nytnewsService.search(searchedWord, page);
          return searchNYT;
        case 'guardian':
          searchGuardian = this.newsService.search(searchedWord, page);
          return searchGuardian;
        case 'newsapi':
          searchNewsApi = this.newsApiService.search(searchedWord);
          return searchNewsApi;
        default:
          throw new NotFoundException('Invalid url');
      }
    } else {
      searchGuardian = this.newsService.search(searchedWord, page);
      searchNYT = this.nytnewsService.search(searchedWord, page);
      searchNewsApi = this.newsApiService.search(searchedWord);
      return mergeNews(searchNYT, searchGuardian, searchNewsApi);
    }
  }
}
