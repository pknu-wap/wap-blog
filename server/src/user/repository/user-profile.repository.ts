import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import { UserProfile } from '@/user/entity/user-profile.entity';
import { UserRepository } from './user.repository';
import { BadRequestException } from '@nestjs/common';

@EntityRepository(UserProfile)
export class UserProfileRepository extends Repository<UserProfile> {
  async createProfile(userId: number, fileName: string) {
    // one to one 관계에서 2개 넣으려고 하면 Duplicate entry for key 중복에러 뜸
    // mysql 문법으로 관계를 정의하는 건 없다.
    try {
      await this.insert({ fileName: fileName, fk_user_id: userId });
    } catch (err) {
      console.log(err);
      throw new BadRequestException('now user exist profile');
    }
  }

  async deleteProfile(userId: number) {
    // 참조하는 쪽이 지워진다고(자식) 부모쪽이 바뀌는 옵션은 없다.( 어떻게 돼도 안되고 )
    await this.delete({ fk_user_id: userId });
  }

  async getPfname(userId: number) {
    const profile = await this.findOne({ fk_user_id: userId });
    return profile.fileName;
  }
}
