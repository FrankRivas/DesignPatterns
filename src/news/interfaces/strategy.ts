import { Observable } from 'rxjs';
import { MyNews } from './news';

export interface Strategy {
  search(searchedWord: string, page: string): Observable<MyNews[]>;
  transform(news: unknown): MyNews;
}
