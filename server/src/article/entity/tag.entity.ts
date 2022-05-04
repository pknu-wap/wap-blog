import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Article, article => article.tags, { onDelete: 'CASCADE' })
  @JoinTable({
    name: 'article_tags',
    joinColumn: {
      name: 'fk_tag_id',
    },
    inverseJoinColumn: {
      name: 'fk_article_id',
    },
  })
  article: Article;
}
