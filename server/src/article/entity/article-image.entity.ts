import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Article } from '@/article/entity';

@Entity()
export class ArticleImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @Column()
  fk_article_id: number;

  @ManyToOne(() => Article, article => article.images, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'fk_article_id' }) //무슨 의미?
  article: Article;
}
