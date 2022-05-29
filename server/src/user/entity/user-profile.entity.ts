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
  name: 'userprofile',
})
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @Column()
  fk_user_id: number;
  // 여기서는 user_image 테이블 생기고
  // 노트북에서 image 테이블 생김
  // 테이블하고 컬럼 둘다 수정사항이 원하는 대로 안됨
  // mysql 쪽인지 typeorm 쪽인지 뭔가 버그 있음

  @OneToOne(() => User, user => user.profile, {
    // onDelete: 'CASCADE',
    nullable: true,
  })
  user: User;
}
