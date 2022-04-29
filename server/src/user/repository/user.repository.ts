import { EntityRepository, Repository } from 'typeorm';
import { User } from '@/user/entity/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findById(id: number): Promise<User> {
    const user = await this.findOne({ id });
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.findOne({ email });
    return user;
  }

  async findByName(username: string): Promise<User> {
    const user = await this.findOne({ username });
    return user;
  }
}
