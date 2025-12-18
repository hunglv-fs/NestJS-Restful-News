import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialTables1704067200000 implements MigrationInterface {
    name = 'CreateInitialTables1704067200000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "news_categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, CONSTRAINT "UQ_news_categories_slug" UNIQUE ("slug"), CONSTRAINT "PK_news_categories" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "news" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" text NOT NULL, "author" character varying NOT NULL, "publishedAt" TIMESTAMP NOT NULL DEFAULT now(), "imageUrl" character varying, "category_id" integer NOT NULL, CONSTRAINT "PK_news" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_news_category" FOREIGN KEY ("category_id") REFERENCES "news_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        
        // Insert initial categories
        await queryRunner.query(`INSERT INTO "news_categories" ("name", "slug") VALUES ('Công nghệ', 'technology'), ('Tài chính', 'finance'), ('Thể thao', 'sports'), ('Giải trí', 'entertainment')`);
        
        // Insert sample news
        await queryRunner.query(`INSERT INTO "news" ("title", "content", "author", "category_id", "imageUrl") VALUES 
            ('Công nghệ AI mới được phát triển', 'Một công nghệ AI mới đã được phát triển với khả năng xử lý ngôn ngữ tự nhiên vượt trội...', 'Nguyễn Văn A', 1, 'https://via.placeholder.com/400x200'),
            ('Thị trường chứng khoán biến động mạnh', 'Thị trường chứng khoán hôm nay có những biến động mạnh do ảnh hưởng của các yếu tố kinh tế...', 'Trần Thị B', 2, 'https://via.placeholder.com/400x200'),
            ('Đội tuyển bóng đá giành chiến thắng', 'Đội tuyển bóng đá quốc gia đã giành chiến thắng ấn tượng trong trận đấu quan trọng...', 'Lê Văn C', 3, 'https://via.placeholder.com/400x200')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_news_category"`);
        await queryRunner.query(`DROP TABLE "news"`);
        await queryRunner.query(`DROP TABLE "news_categories"`);
    }
}