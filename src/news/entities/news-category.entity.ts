import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { News } from './news.entity';

@Entity('news_categories')
export class NewsCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @OneToMany(() => News, news => news.category)
  news: News[];
}