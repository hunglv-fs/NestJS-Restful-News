import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { News } from './entities/news.entity';
import { NewsCategory } from './entities/news-category.entity';
import { PaginatedResult } from './dto/pagination.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
    @InjectRepository(NewsCategory)
    private categoryRepository: Repository<NewsCategory>,
  ) {}

  getAllNews(): Observable<News[]> {
    return from(this.newsRepository.find({ relations: ['category'] }));
  }

  getNewsById(id: number): Observable<News | null> {
    return from(this.newsRepository.findOne({ 
      where: { id }, 
      relations: ['category'] 
    }));
  }

  getNewsByCategory(categorySlug: string): Observable<News[]> {
    return from(this.newsRepository.find({
      relations: ['category'],
      where: { category: { slug: categorySlug } }
    }));
  }

  getCategories(): Observable<NewsCategory[]> {
    return from(this.categoryRepository.find());
  }

  searchNews(query: string): Observable<News[]> {
    return from(this.newsRepository.find({
      relations: ['category'],
      where: [
        { title: Like(`%${query}%`) },
        { content: Like(`%${query}%`) }
      ]
    }));
  }

  getLatestNews(limit: number = 5): Observable<News[]> {
    return from(this.newsRepository.find({
      relations: ['category'],
      order: { publishedAt: 'DESC' },
      take: limit
    }));
  }

  getAllNewsWithPagination(page: number = 1, limit: number = 10): Observable<PaginatedResult<News>> {
    const skip = (page - 1) * limit;
    
    return from(
      Promise.all([
        this.newsRepository.find({
          relations: ['category'],
          skip,
          take: limit,
          order: { publishedAt: 'DESC' }
        }),
        this.newsRepository.count()
      ])
    ).pipe(
      map(([data, total]) => ({
        data,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }))
    );
  }
  getXX(): Observable<string>{
    return from(Promise.resolve('XX'));
  }
}