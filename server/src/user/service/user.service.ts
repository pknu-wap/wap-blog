import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/user/repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getCurrentUser(userId: string) {
    const user = await this.userRepository.findById(userId);
    return { id: user.id, email: user.email, username: user.username };
  }
}
