import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Article } from './article.entity'

@Entity()
export class Comment {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  commentor: string;

  @ApiProperty()
  @Column()
  comment: string;

  @ManyToOne(() => Article, (article) => article.comments)
  @JoinColumn({ name: "article_id"})
  article: Article;

  //   article: Article;
}