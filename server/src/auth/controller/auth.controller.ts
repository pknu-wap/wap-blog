import { AuthService } from '@/auth/service/auth.service';
import { UserService } from '@/user/service';
import { Body, Controller, Delete, Get, Post, Req } from '@nestjs/common';
import { SignupRequestDto } from '@/auth/dto';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/signup')
  async register(@Body() body: SignupRequestDto) {
    console.log(body)
    return this.authService.signup(body);
  }
  
  @Post('/login')
  async login() {
    return;
  }

  @Get('/github-login')
  async githubLogin() {
    return;
  }

  @Get('/google-login')
  async goolgeLogin() {
    return;
  }

  @Delete('/logout')
  async logout() {
    return;
  }
}
