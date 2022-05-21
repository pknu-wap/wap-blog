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
  path: string;

  @Column()
  fk_article_id: number;

  @ManyToOne(() => Article, article => article.images, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'fk_article_id' })
  article: Article;
}
