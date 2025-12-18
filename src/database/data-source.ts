import { DataSource } from 'typeorm';
import { News } from '../news/entities/news.entity';
import { NewsCategory } from '../news/entities/news-category.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_DATABASE || 'nestjs_news',
  entities: [News, NewsCategory],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
});