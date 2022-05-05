import { UserRepository } from '@/user/repository';
import { ConfigService } from '@nestjs/config';
import { HttpException, Injectable, Res } from '@nestjs/common';
import axios from 'axios';
import { AuthService } from '@/auth/service';
import { Response } from 'express';

@Injectable()
export class GithubService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  async githubCallback(code: string, @Res() res: Response) {
    try {
      const GITHUB_ID = this.configService.get('auth.github.id');
      const GITHUB_SECRET = this.configService.get('auth.github.secret');
      const accessToken = await this.getGithubAccessToken(
        code,
        GITHUB_ID,
        GITHUB_SECRET,
      );
      if (!accessToken) throw new HttpException('액서스 토큰 받기 실패', 400);
      const userInfo = await this.getGithubUserInfo(accessToken);
      const userId = await this.getGithubUserId(userInfo);
      if (!userId) throw new HttpException('로그인 실패', 400);
      const tokens = await this.authService.getTokens(userId, userInfo.email);
      await this.authService.updateRtHash(userId, tokens.refresh_token);
      this.authService.setTokenCookie(res, tokens);
    } catch (e) {
      throw new HttpException(e.message, 500);
    }
  }

  async getGithubAccessToken(
    code: string,
    clientId: string,
    clientSecret: string,
  ) {
    const response = await axios.post(
      `https://github.com/login/oauth/access_token`,
      {
        client_id: clientId,
        client_secret: clientSecret,
        code,
      },
      {
        headers: {
          accepet: 'application/json',
        },
      },
    );
    const access_token = response.data.split('&')[0].split('=')[1];
    return access_token;
  }

  async getGithubUserInfo(accessToken: string) {
    const response = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });
    return response.data;
  }

  async getGithubUserId({ id, node_id, name }) {
    const exUser = await this.userRepository.findByEmail(id);
    if (exUser) return exUser.id;

    const user = {
      email: id,
      username: name,
      password: node_id,
    };

    return await this.userRepository.createUserAndGetUserId(user);
  }
}
