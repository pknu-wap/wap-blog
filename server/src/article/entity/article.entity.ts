import { ApiProperty } from '@nestjs/swagger';
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

@Entity()
export class Article {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column('text')
  body: string;

  @ApiProperty()
  @Column()
  fk_user_id: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @ManyToOne(() => User, user => user.articles)
  @JoinColumn({ name: 'fk_user_id' })
  user: User;

  @ApiProperty()
  @OneToMany(() => Comment, comment => comment.article)
  comments: Comment[];

  @ApiProperty()
  @ManyToMany(() => Tag, tag => tag.article)
  tags: Tag[];
}
