import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@/user/entity';

@Entity({
  name: "userprofile"
})
export class UserProfile{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @Column()
  fk_user_id: number; //안만들어도 생김 근데 안만들면 못 불러옴
  // user_image 스케마 생기는 것도 그렇고 모르겠다.
  // mysql에 캐싱되는 데이터가 있는 듯 한데

  @OneToOne(() => User, user => user.profile, {
    nullable: true,
  })
  user: User;
}