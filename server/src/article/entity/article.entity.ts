import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment, Tag } from '@/article/entity';
import { User } from '@/user/entity';
import { ArticleImage } from './article-image.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('text')
  body: string;

  @Column()
  fk_user_id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.articles, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'fk_user_id' })
  user: User;

  @OneToMany(() => Comment, comment => comment.article, { eager: true })
  comments: Comment[];

  @OneToMany(() => ArticleImage, image => image.article)
  images: ArticleImage[];

  @ManyToMany(() => Tag, tag => tag.articles, { eager: true })
  tagList: Tag[];
}
