import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Article } from '@/article/entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Article, article => article.tagList, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'article_tags',
    joinColumn: {
      name: 'fk_tag_id',
    },
    inverseJoinColumn: {
      name: 'fk_article_id',
    },
  })
  articles: Article[];
}
