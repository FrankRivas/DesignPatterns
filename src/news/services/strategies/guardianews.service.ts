import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { HttpService } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { GuardianNews, MyNews } from '../../interfaces/news';
import { ConfigService } from '@nestjs/config';
import { Strategy } from 'src/news/interfaces/strategy';

@Injectable()
export class GuardiaNewsService implements Strategy {
  constructor(private readonly http: HttpService, private readonly configService: ConfigService) {}

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

  search(searchedWord: string, page: string): Observable<MyNews[]> {
    const key = this.configService.get<string>('GUARDIAN_KEY');
    const baseUrl = this.configService.get<string>('GUARDIAN_URL_BASE');
    const filters = this.configService.get<string>('GUARDIAN_URL_FILTERS');
    return this.http.get(`${baseUrl}api-key=${key}&q=${searchedWord}${filters}&page=${page}`).pipe(
      map(response => response.data.response.results.map(this.transform)),
      catchError(() => throwError(new ServiceUnavailableException())),
    );
  }
}
