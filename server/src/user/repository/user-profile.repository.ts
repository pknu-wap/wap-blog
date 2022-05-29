import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import { UserProfile } from '@/user/entity/user-profile.entity';
import { UserRepository } from './user.repository';
import { BadRequestException } from '@nestjs/common';

@EntityRepository(UserProfile)
export class UserProfileRepository extends Repository<UserProfile> {
    async createProfile(userId: number, fileName: string) {
        const check = await this.findOne({fk_user_id: userId})
        if ( check !== undefined ) return false;
        await this.insert({ fileName: fileName, fk_user_id: userId });
        const profile = await this.findOne({fk_user_id: userId})

        const userrepo = getCustomRepository(UserRepository);
        const user = await userrepo.findOne({id: userId});
        user.profile = profile;
        await userrepo.save(user);
    }

    async deleteProfile(userId: number){
        const userrepo = getCustomRepository(UserRepository);
        // const user = await userrepo.findOne({id: userId});      
        // userrepo.remove(user)
        // delete remove 둘 다 CASCADE not working
        
        const user = await userrepo.findOne({ id: userId });
        user.profile = null;
        await userrepo.save(user);
        await this.delete({fk_user_id: userId});
    }   
}
