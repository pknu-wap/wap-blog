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

  @Column()
  fk_user_id: number;

  @OneToOne(() => User, user => user.profile, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'fk_user_id'})
  user: User;
}