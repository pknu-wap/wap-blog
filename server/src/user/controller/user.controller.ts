import { GetCurrentUserId, Public } from '@/common/decorator';
import { UserService } from '@/user/service/user.service';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get()
  async getCurrentUser(@GetCurrentUserId() userId: number) {
    return await this.userService.getCurrentUser(userId);
  }
}
