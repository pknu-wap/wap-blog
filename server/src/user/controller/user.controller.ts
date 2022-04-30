import { GetCurrentUserId } from '@/common/decorator';
import { UserService } from '@/user/service/user.service';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  async getCurrentUser(@GetCurrentUserId() userId: string) {
    return await this.userService.getCurrentUser(userId);
  }
}
