import { Injectable, NotFoundException } from '@nestjs/common';
import { Observable, merge } from 'rxjs';
import { MyNews } from '../interfaces/news';
import { reduce } from 'rxjs/operators';
import { GuardiaNewsService } from '../services/strategies/guardianews.service';
import { NYTNewsService } from '../services/strategies/nytnews.service';
import { NewsAPIService } from '../services/strategies/newsapi.service';
import { StrategyContext } from '../services/searchStrategyContext';

enum searchers {
  'nyt',
  'guardian',
  'newsapi',
}

@Injectable()
export class NewsService {
  constructor(
    private readonly guardiaNewService: GuardiaNewsService,
    private readonly nytnewsService: NYTNewsService,
    private readonly newsApiService: NewsAPIService,
  ) {}
  searchNews(
    searcher: string | undefined,
    searchedWord: string,
    page: string,
  ): Observable<MyNews[]> | undefined {
    let searchGuardian;
    let searchNYT;
    let searchNewsApi;
    const searchStrategy = new StrategyContext();
    if (!searcher) {
      searchStrategy.setStrategy(this.nytnewsService);
      searchNYT = searchStrategy.searchNews(searchedWord, page);
      searchStrategy.setStrategy(this.guardiaNewService);
      searchGuardian = searchStrategy.searchNews(searchedWord, page);
      searchStrategy.setStrategy(this.newsApiService);
      searchNewsApi = searchStrategy.searchNews(searchedWord, page);
      return this.mergeNews(searchNYT, searchGuardian, searchNewsApi);
    }
    switch (searcher) {
      case searchers[0]:
        searchStrategy.setStrategy(this.nytnewsService);
        return searchStrategy.searchNews(searchedWord, page);
      case searchers[1]:
        searchStrategy.setStrategy(this.guardiaNewService);
        return searchStrategy.searchNews(searchedWord, page);
      case searchers[2]:
        searchStrategy.setStrategy(this.newsApiService);
        return searchStrategy.searchNews(searchedWord, page);
      default:
        throw new NotFoundException('Invalid url');
    }
  }

  mergeNews(
    nyNews: Observable<MyNews[]>,
    guardianNews: Observable<MyNews[]>,
    newsApi: Observable<MyNews[]>,
  ): Observable<MyNews[]> {
    return merge(nyNews, guardianNews, newsApi).pipe(
      reduce((acum, val) =>
        [...acum, ...val].sort((a, b) => {
          return a.webPublicationDate > b.webPublicationDate ? -1 : 1;
        }),
      ),
    );
  }
}
