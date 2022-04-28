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
      //TODO:: 일단 임시로 email 파라미터에 그냥 넣어놓음 수정 필요
      const { access_token, refresh_token } = await this.authService.getTokens(
        userId,
        'email',
      );
      res.cookie('access_token', access_token, {
        maxAge: 1000 * 10, // 10s
        httpOnly: true,
      });
      res.cookie('refresh_token', refresh_token, {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7d
        httpOnly: true,
      });
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
      'https://github.com/login/oauth/access_token',
      {
        clientId,
        clientSecret,
        code,
      },
      {
        headers: {
          accepet: 'application/json',
        },
      },
    );

    return response.data.access_token;
  }

  async getGithubUserInfo(accessToken: string) {
    const response = await axios.post('https://api.github.com/user', {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    return response.data;
  }

  async getGithubUserId({ id, node_id, avatar_url, name, login, email }) {
    const existUser = await this.userRepository.findByEmail(id);
    if (existUser) return existUser.id;

    const user = {
      email: id,
      username: name ?? login ?? email,
    };

    this.userRepository.create(user);
    return (await this.userRepository.findByEmail(email)).id;
  }
}
