import { EntityRepository, Repository } from 'typeorm';
import { UserProfile } from '@/user/entity/user-profile.entity';

@EntityRepository(UserProfile)
export class UserProfileRepository extends Repository<UserProfile> {
    
}
