import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { AuthService, GithubService, GoogleService } from '@/auth/service';
import { SignupRequestDto, SigninRequestDto } from '@/auth/dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { Public, GetCurrentUserId } from '@/common/decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly githubService: GithubService,
    private readonly googleService: GoogleService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @Post('/signup/local')
  async signupLocal(@Body() body: SignupRequestDto): Promise<void> {
    await this.authService.signupLocal(body);
  }

  @Public()
  @Post('/signin/local')
  async signinLocal(
    @Body() body: SigninRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { tokens, user } = await this.authService.signinLocal(body);
    this.authService.setTokenCookie(res, tokens);
    return user;
  }

  @Public()
  @Get('/signin/github')
  async signinGithub(@Res({ passthrough: true }) res: Response): Promise<void> {
    const GITHUB_ID = this.configService.get('auth.github.id');
    const REDIRECT_URI = this.configService.get('auth.github.redirect');

    const url = `https://github.com/login/oauth/authorize?scope=user:email&client_id=${GITHUB_ID}&redirect_uri=${REDIRECT_URI}`;

    res.redirect(encodeURI(url));
  }

  @Public()
  @Get('/github/callback')
  async githubCallback(
    @Query('code') code: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const redirect = this.configService.get<string>('client');
    await this.githubService.githubCallback(code, res);
    res.redirect(encodeURI(redirect));
  }

  @Public()
  @Get('/signin/google')
  async signinGoogle(@Res({ passthrough: true }) res: Response): Promise<void> {
    const GOOGLE_ID = this.configService.get('auth.google.id');
    const REDIRECT_URI = this.configService.get('auth.google.redirect');
    const url = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${REDIRECT_URI}&client_id=${GOOGLE_ID}&response_type=code&include_granted_scopes=true&scope=profile`;
    res.redirect(encodeURI(url));
  }

  @Public()
  @Get('/google/callback')
  async googleCallback(
    @Query('code') code: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const redirect = this.configService.get<string>('client');
    await this.googleService.googleCallback(code, res);
    res.redirect(encodeURI(redirect));
  }

  @Delete('/logout')
  async logout(
    @Res({ passthrough: true }) res: Response,
    @GetCurrentUserId() userId: number,
  ): Promise<void> {
    await this.authService.logout(userId);
    this.authService.clearTokenCookie(res);
  }
}
