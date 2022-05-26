import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/user/repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getCurrentUser(userId: number) {
    const user = await this.userRepository.findById(userId);
    if (!user) return null;
    return { id: user.id, email: user.email, username: user.username, pofile: user.profile };
  }
}
