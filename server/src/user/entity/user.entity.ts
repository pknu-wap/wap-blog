import { Article, Comment } from '@/article/entity';
import { UserProfile } from './index';
import { IsEmail } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  hashedRt: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @OneToMany(() => Article, article => article.user)
  articles: Article[];

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];

  @OneToOne(() => UserProfile, profile => profile.user, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  profile: UserProfile
}
