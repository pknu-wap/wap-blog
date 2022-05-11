import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Article } from '@/article/entity';
import { User } from '@/user/entity';

@Entity()
export class Image {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('text')
  key: string;

  @ApiProperty()
  @Column()
  fk_article_id: number;

  @ApiProperty()
  @ManyToOne(() => Article, article => article.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'fk_article_id' })
  article: Article;
}