import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MyNews, NewsAPI } from './interfaces/news';
import { ConfigService } from '@nestjs/config';
import { codes } from '../utils/helpers';

@Injectable()
export class NewsAPIService {
  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {}

  transform(news: NewsAPI): MyNews {
    const newArt = {
      webPublicationDate: new Date(news.publishedAt),
      webTitle: news.title,
      webUrl: news.url,
      author: news.author,
    };
    return newArt;
  }

  search(searchedWord: string): Observable<MyNews[]> {
    const key = this.configService.get<string>('NEWS_KEY');
    const baseUrl = this.configService.get<string>('NEWS_URL_BASE');
    const filters = this.configService.get<string>('NEWS_URL_FILTERS');
    return this.http
      .get(`${baseUrl}q=${searchedWord}&apiKey=${key}${filters}`)
      .pipe(
        map(response => response.data.articles.map(this.transform)),
        catchError(err => {
          if (err.response) {
            return throwError(
              new HttpException(
                codes[err.response.status],
                err.response.status,
              ),
            );
          } else {
            throw err;
          }
        }),
      );
  }
}
