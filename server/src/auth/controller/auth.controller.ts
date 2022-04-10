import { AuthService } from '@/auth/service';
import { Body, Controller, Delete, Get, Post, Res } from '@nestjs/common';
import { SignupRequestDto, SigninRequestDto } from '@/auth/dto';
import { Response } from 'express';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup/local')
  async signupLocal(@Body() body: SignupRequestDto) {
    return this.authService.signupLocal(body);
  }

  @Post('/signin/local')
  async signinLocal(
    @Body() body: SigninRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, refresh_token } = await this.authService.signinLocal(
      body,
    );
    res.cookie('access_token', access_token, {
      maxAge: 1000 * 10, // 10s
      httpOnly: true,
    });
    res.cookie('refresh_token', refresh_token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7d
      httpOnly: true,
    });
    return { access_token, refresh_token };
  }

  @Get('/signin/github')
  async signinGithub() {
    return;
  }

  @Get('/signin/google')
  async signinGoogle() {
    return;
  }

  @Delete('/logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    //TODO: 여기 @GetCurrentUserId() userId: number 전용 decoration 적용 예정
    //TODO: await this.authService.logout(userId);
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
  }
}
