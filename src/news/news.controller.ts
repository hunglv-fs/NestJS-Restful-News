import { Controller, Get, Param, Query } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { NewsService } from './news.service';
import { News } from './entities/news.entity';
import { NewsCategory } from './entities/news-category.entity';
import { PaginationDto, PaginatedResult } from './dto/pagination.dto';

@Controller('api/v1/news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  getAllNews(@Query() paginationDto: PaginationDto): Observable<PaginatedResult<News>> {
    const { page = 1, limit = 10 } = paginationDto;
    return this.newsService.getAllNewsWithPagination(page, limit);
  }

  @Get('latest')
  getLatestNews(@Query('limit') limit?: string): Observable<News[]> {
    const limitNum = limit ? parseInt(limit, 10) : 5;
    return this.newsService.getLatestNews(limitNum);
  }

  @Get('search')
  searchNews(@Query('q') query: string): Observable<News[]> {
    return this.newsService.searchNews(query || '');
  }

  @Get('categories')
  getCategories(): Observable<NewsCategory[]> {
    return this.newsService.getCategories();
  }

  @Get('category/:category')
  getNewsByCategory(@Param('category') category: string): Observable<News[]> {
    return this.newsService.getNewsByCategory(category);
  }

  @Get(':id')
  getNewsById(@Param('id') id: string): Observable<News | null> {
    return this.newsService.getNewsById(parseInt(id, 10));
  }

  @Get('xx/ssss')
  getXX(): Observable<string>{
   return from(Promise.resolve('XXxssss'));
  }
}