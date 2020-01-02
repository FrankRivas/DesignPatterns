import {
  Controller,
  Get,
  Query,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { GuardiaNewsService } from './services/strategies/guardianews.service';
import { NYTNewsService } from './services/strategies/nytnews.service';
import { NewsAPIService } from './services/strategies/newsapi.service';
import { Observable } from 'rxjs';
import { MyNews } from './interfaces/news';
import { AuthGuard } from '@nestjs/passport';
import { mergeNews } from '../utils/helpers';
import { StrategyContext } from './services/searchStrategyContext';

@Controller('news')
export class NewsController {
  constructor(
    private readonly guardiaNewService: GuardiaNewsService,
    private readonly nytnewsService: NYTNewsService,
    private readonly newsApiService: NewsAPIService,
  ) {}
  @UseGuards(AuthGuard('jwt'))
  @Get()
  search(
    @Query('searchedWord') searchedWord: string,
    @Query('searcher') searcher: string,
    @Query('page') page: string,
  ): Observable<MyNews[]> | undefined {
    let searchGuardian;
    let searchNYT;
    let searchNewsApi;
    const searchStrategy = new StrategyContext();
    if (!searcher) {
      // searchGuardian = this.guardiaNewService.search(searchedWord, page);
      // searchNYT = this.nytnewsService.search(searchedWord, page);
      // searchNewsApi = this.newsApiService.search(searchedWord, page);
      searchStrategy.setStrategy(this.nytnewsService);
      searchNYT = searchStrategy.searchNews(searchedWord, page);
      searchStrategy.setStrategy(this.guardiaNewService);
      searchGuardian = searchStrategy.searchNews(searchedWord, page);
      searchStrategy.setStrategy(this.newsApiService);
      searchNewsApi = searchStrategy.searchNews(searchedWord, page);
      return mergeNews(searchNYT, searchGuardian, searchNewsApi);
    }
    switch (searcher) {
      case 'nyt':
        searchStrategy.setStrategy(this.nytnewsService);
        return searchStrategy.searchNews(searchedWord, page);
      case 'guardian':
        searchStrategy.setStrategy(this.guardiaNewService);
        return searchStrategy.searchNews(searchedWord, page);
      case 'newsapi':
        searchStrategy.setStrategy(this.newsApiService);
        return searchStrategy.searchNews(searchedWord, page);
      default:
        throw new NotFoundException('Invalid url');
    }
  }
}
