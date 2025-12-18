# NestJS News API với RxJS

Dự án API tin tức sử dụng NestJS và RxJS với dữ liệu mock.

## Cài đặt

```bash
npm install
```

## Cấu hình Database

1. Tạo database trong PostgreSQL:
```sql
CREATE DATABASE nestjs_news;
```

2. Chạy migration để tạo bảng:
```bash
npm run migration:run
```

## Chạy ứng dụng

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

## Migration Commands

```bash
# Tạo migration mới
npm run migration:generate -- src/database/migrations/MigrationName

# Chạy migration
npm run migration:run

# Rollback migration
npm run migration:revert
```

## API Endpoints

### Tin tức
- `GET /api/v1/news` - Lấy tất cả tin tức (hỗ trợ phân trang)
- `GET /api/v1/news?page=1&limit=5` - Lấy tin tức với phân trang
- `GET /api/v1/news/latest?limit=5` - Lấy tin tức mới nhất
- `GET /api/v1/news/search?q=keyword` - Tìm kiếm tin tức
- `GET /api/v1/news/:id` - Lấy tin tức theo ID
- `GET /api/v1/news/category/:category` - Lấy tin tức theo danh mục

### Danh mục
- `GET /api/v1/news/categories` - Lấy tất cả danh mục

## Ví dụ sử dụng

```bash
# Lấy tất cả tin tức (mặc định page=1, limit=10)
curl http://localhost:3000/api/v1/news

# Lấy tin tức với phân trang
curl http://localhost:3000/api/v1/news?page=1&limit=5

# Lấy trang 2 với 3 bài mỗi trang
curl http://localhost:3000/api/v1/news?page=2&limit=3

# Lấy tin tức mới nhất (3 bài)
curl http://localhost:3000/api/v1/news/latest?limit=3

# Tìm kiếm tin tức
curl http://localhost:3000/api/v1/news/search?q=công nghệ

# Lấy tin tức theo danh mục
curl http://localhost:3000/api/v1/news/category/technology
```

## Công nghệ sử dụng

- NestJS - Framework Node.js
- RxJS - Reactive programming
- TypeScript - Ngôn ngữ lập trình