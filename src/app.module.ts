import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { NewsModule } from './news/news.module';
import { AppDataSource } from './database/data-source';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { FileLoggerMiddleware } from './middleware/file-logger.middleware';
import { CorsMiddleware } from './middleware/cors.middleware';
import { RateLimitMiddleware } from './middleware/rate-limit.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(AppDataSource.options),
    NewsModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddleware, FileLoggerMiddleware, LoggerMiddleware, RateLimitMiddleware)
      .forRoutes('*');
  }
}