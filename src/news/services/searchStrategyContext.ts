import { Strategy } from '../interfaces/strategy';
import { Observable } from 'rxjs';
import { MyNews } from '../interfaces/news';

export class StrategyContext {
  private strategy!: Strategy;

  public setStrategy(strategy: Strategy): void {
    this.strategy = strategy;
  }

  public searchNews(searchedWord: string, page = '1'): Observable<MyNews[]> {
    return this.strategy.search(searchedWord, page);
  }
}
