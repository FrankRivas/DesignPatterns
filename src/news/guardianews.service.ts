import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { GuardianNews, MyNews } from './interfaces/news';
import { ConfigService } from '@nestjs/config';
import { codes } from '../utils/helpers';

@Injectable()
export class GuardiaNewsService {
  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {}

  transform(news: GuardianNews): MyNews {
    let author = '';
    if (news.fields) {
      author = news.fields.byline;
    }
    const newArt = {
      webPublicationDate: new Date(news.webPublicationDate),
      webTitle: news.webTitle,
      webUrl: news.webUrl,
      author,
    };
    return newArt;
  }

  search(searchedWord: string, page = '1'): Observable<MyNews[]> {
    const key = this.configService.get<string>('GUARDIAN_KEY');
    const baseUrl = this.configService.get<string>('GUARDIAN_URL_BASE');
    const filters = this.configService.get<string>('GUARDIAN_URL_FILTERS');
    return this.http
      .get(`${baseUrl}api-key=${key}&q=${searchedWord}${filters}&page=${page}`)
      .pipe(
        map(response => response.data.response.results.map(this.transform)),
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
