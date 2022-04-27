import { AuthService } from '@/auth/service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { SignupRequestDto, SigninRequestDto } from '@/auth/dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { GithubService } from '../service/github-auth.service';
import { GoogleService } from '../service/goolge-auth.service';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly githubService: GithubService,
    private readonly googleService: GoogleService,
    private readonly configService: ConfigService,
  ) {}

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
  async signinGithub(@Res({ passthrough: true }) res: Response) {
    const redirect_uri = this.configService.get('auth.github.redirect');
    const client_id = this.configService.get('auth.github.id');
    const url = `https://github.com/login/oauth/authorize?redirect_uri=${redirect_uri}&client_id=${client_id}`;

    res.redirect(url);
  }

  @Get('/github/callback')
  async githubCallback(
    @Query('code') code: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.githubService.githubCallback(code, res);
    res.redirect(this.configService.get<string>('client'));
  }

  @Get('/signin/google')
  async signinGoogle(@Res({ passthrough: true }) res: Response) {
    const redirect_uri = this.configService.get('auth.google.redirect');
    const client_id = this.configService.get('auth.google.id');
    const url = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${redirect_uri}&client_id=${client_id}&response_type=code&include_granted_scopes=true&scope=profile`;

    res.redirect(url);
  }

  @Get('/google/callback')
  async googleCallback(
    @Query('code') code: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.googleService.googleCallback(code, res);
    res.redirect(this.configService.get<string>('client'));
  }

  @Delete('/logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    //TODO: 여기 @GetCurrentUserId() userId: number 전용 decoration 적용 예정
    //TODO: await this.authService.logout(userId);
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
  }
}
