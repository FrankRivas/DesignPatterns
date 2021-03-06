import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { HttpService } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MyNews, NewsAPI } from '../../interfaces/news';
import { ConfigService } from '@nestjs/config';
import { Strategy } from 'src/news/interfaces/strategy';

@Injectable()
export class NewsAPIService implements Strategy {
  constructor(private readonly http: HttpService, private readonly configService: ConfigService) {}

  transform(news: NewsAPI): MyNews {
    const newArt = {
      webPublicationDate: new Date(news.publishedAt),
      webTitle: news.title,
      webUrl: news.url,
      author: news.author,
    };
    return newArt;
  }

  search(searchedWord: string, page: string): Observable<MyNews[]> {
    const key = this.configService.get<string>('NEWS_KEY');
    const baseUrl = this.configService.get<string>('NEWS_URL_BASE');
    const filters = this.configService.get<string>('NEWS_URL_FILTERS');
    return this.http.get(`${baseUrl}q=${searchedWord}&apiKey=${key}${filters}&page=${page}`).pipe(
      map(response => response.data.articles.map(this.transform)),
      catchError(() => throwError(new ServiceUnavailableException())),
    );
  }
}
