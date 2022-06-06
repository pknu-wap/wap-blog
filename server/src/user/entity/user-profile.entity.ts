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

  @Column({ nullable: true })
  fk_user_id: number;
  @JoinColumn({ name: 'fk_user_id' })
  // 외래키 기본은 참조 테이블의 primarykey 를 참조함
  // joincolumn만 써도 컬럼생기기는 하는데 순서상 만들고 외래키 지정이 맞다
  // + 생겨도 typeorm에서 인식못함
  @OneToOne(() => User, user => user.profile, {
    // cascade: true, 양쪽이 참조할 때 사용한다 보면 될 듯
    onDelete: 'CASCADE',
  })
  user: User;
  // 일대다, 일대일, 다대다 설정과 joincolum(외래키 설정)은 무관한데
  // 외래키를 설정한다는 것은 어떤 관계든 관계가 있다는 것이여서 같이 한다.
}
