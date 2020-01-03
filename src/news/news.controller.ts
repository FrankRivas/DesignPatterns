import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MyNews } from './interfaces/news';
import { AuthGuard } from '@nestjs/passport';
import { NewsService } from './services/news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get()
  search(
    @Query('searchedWord') searchedWord: string,
    @Query('searcher') searcher: string,
    @Query('page') page: string,
  ): Observable<MyNews[]> | undefined {
    return this.newsService.searchNews(searcher, searchedWord, page);
  }
}
