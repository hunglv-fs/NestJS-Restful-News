import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { NewsCategory } from './news-category.entity';

@Entity('news')
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column()
  author: string;

  @CreateDateColumn()
  publishedAt: Date;

  @Column({ nullable: true })
  imageUrl: string;

  @ManyToOne(() => NewsCategory, category => category.news)
  @JoinColumn({ name: 'category_id' })
  category: NewsCategory;

  @Column()
  category_id: number;
}