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
import { GithubService } from '@/auth/service/github-auth.service';
import { GoogleService } from '@/auth/service/goolge-auth.service';
import { google } from 'googleapis';

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

  //TODO: 여기부분은 redirect가 맞는 것 같은데
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

  //TODO: 여기는 url이 변경될 필요가 있음
  @Get('/signin/google')
  async signinGoogle(@Res({ passthrough: true }) res: Response) {
    const redirect_uri = this.configService.get('auth.google.redirect');
    const GOOGLE_ID = this.configService.get('auth.google.id');
    const GOOGLE_SECRET = this.configService.get('auth.google.secret');
    const oauth2Client = new google.auth.OAuth2(
      GOOGLE_ID,
      GOOGLE_SECRET,
      redirect_uri,
    );
    const url = oauth2Client.generateAuthUrl({
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ],
      //TODO: 여기 state를 넣을 지 말 지 모르겠음
    });
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
