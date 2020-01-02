import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { HttpService } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MyNews, NYTNews } from '../../interfaces/news';
import { ConfigService } from '@nestjs/config';
import { Strategy } from 'src/news/interfaces/strategy';

@Injectable()
export class NYTNewsService implements Strategy {
  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {}

  transform(news: NYTNews): MyNews {
    const newArt = {
      webPublicationDate: new Date(news.pub_date),
      webTitle: news.headline.main,
      webUrl: news.web_url,
      author: news.byline.original,
    };
    return newArt;
  }

  search(searchedWord: string, page: string): Observable<MyNews[]> {
    const key = this.configService.get<string>('NYT_KEY');
    const baseUrl = this.configService.get<string>('NYT_URL_BASE');
    const filters = this.configService.get<string>('NYT_URL_FILTERS');
    return this.http
      .get(`${baseUrl}q=${searchedWord}${filters}&api-key=${key}&page=${page}`)
      .pipe(
        map(response => response.data.response.docs.map(this.transform)),
        catchError(() => throwError(new ServiceUnavailableException())),
      );
  }
}
