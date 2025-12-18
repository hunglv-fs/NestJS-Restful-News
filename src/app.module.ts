import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { NewsModule } from './news/news.module';
import { News } from './news/entities/news.entity';
import { NewsCategory } from './news/entities/news-category.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_DATABASE || 'nestjs_news',
      entities: [News, NewsCategory],
      synchronize: false,
    }),
    NewsModule
  ],
})
export class AppModule {}