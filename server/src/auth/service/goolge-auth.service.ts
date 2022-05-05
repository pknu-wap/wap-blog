import { UserRepository } from '@/user/repository';
import { ConfigService } from '@nestjs/config';
import { HttpException, Injectable, Res } from '@nestjs/common';
import { AuthService } from '@/auth/service';
import { Response } from 'express';
import axios from 'axios';

@Injectable()
export class GoogleService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  async googleCallback(code: string, @Res() res: Response) {
    try {
      const GOOGLE_ID = this.configService.get('auth.google.id');
      const GOOGLE_SECRET = this.configService.get('auth.google.secret');
      const REDIRECT_URI = this.configService.get('auth.google.redirect');
      const accessToken = await this.getGoogleAccessToken(
        code,
        GOOGLE_ID,
        GOOGLE_SECRET,
        REDIRECT_URI,
      );
      if (!accessToken) throw new HttpException('access_token 받기 실패', 400);
      const userInfo = await this.getGoogleUserInfo(accessToken);
      const userId = await this.getGoogleUserId(userInfo);
      if (!userId) throw new HttpException('로그인 실패', 400);
      const tokens = await this.authService.getTokens(userId, userInfo.email);
      await this.authService.updateRtHash(userId, tokens.refresh_token);
      this.authService.setTokenCookie(res, tokens);
    } catch (e) {
      throw new HttpException(e.message, 500);
    }
  }

  async getGoogleAccessToken(
    code: string,
    clientId: string,
    clientSecret: string,
    redirectUri: string,
  ) {
    const response = await axios.post(
      'https://oauth2.googleapis.com/token',
      {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
        code,
      },
      {
        headers: {
          accepet: 'application/json',
        },
      },
    );
    const access_token = response.data.access_token;
    return access_token;
  }

  async getGoogleUserInfo(accessToken: string) {
    const response = await axios.get(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  }

  async getGoogleUserId({ id, name }) {
    const exUser = await this.userRepository.findByEmail(id);
    if (exUser) return exUser.id;

    const encodedPassword = await this.authService.hashData(id + name);
    const user = {
      email: id,
      username: name,
      password: encodedPassword,
    };
    return await this.userRepository.createUserAndGetUserId(user);
  }
}
