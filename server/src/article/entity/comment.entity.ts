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
export class Comment {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('text')
  text: string;

  @ApiProperty()
  @Column()
  fk_user_id: number;

  @ApiProperty()
  @Column()
  fk_article_id: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updateddAt: Date;

  @ApiProperty()
  @ManyToOne(() => User, user => user.comments)
  @JoinColumn({ name: 'fk_user_id' })
  user: User;

  @ApiProperty()
  @ManyToOne(() => Article, article => article.comments)
  @JoinColumn({ name: 'fk_article_id' })
  article: Article;
}
