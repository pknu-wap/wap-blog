import { EntityRepository, Repository } from 'typeorm';
import { User } from '@/user/entity/user.entity';
import { CreateUserDTO } from '../dto/create-user.dto';

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

  async createUser(createUser: CreateUserDTO): Promise<User> {
    const user = this.create(createUser);
    this.save(user);
    return user;
  }

  async createUserAndGetUserId(createUser: CreateUserDTO): Promise<number> {
    const user = await this.createUser(createUser);
    return user.id;
  }
}
