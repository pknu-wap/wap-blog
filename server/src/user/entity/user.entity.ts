import { Article, Comment } from '@/article/entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ unique: true })
  username: string;

  @ApiProperty()
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @Column({ nullable: true })
  hashedRt: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updateAt: Date;

  @ApiProperty()
  @OneToMany(() => Article, article => article.user)
  articles: Article[];

  @ApiProperty()
  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];
}
