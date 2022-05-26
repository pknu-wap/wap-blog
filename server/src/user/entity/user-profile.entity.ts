import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@/user/entity';

@Entity()
export class UserProfile{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @OneToOne(() => User, user => user.profile, {
    nullable: true,
  })
  user: User;
}