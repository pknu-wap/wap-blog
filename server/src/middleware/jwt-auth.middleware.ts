import { AuthService } from '@/auth/service';
import {
  HttpException,
  Injectable,
  NestMiddleware,
  Next,
  Req,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

// 토큰 갱신 관련 미들웨어
// 토큰 갱신도 하고 토큰 있으면 req.body.user에 넣어주기
@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}
  async use(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    const accessToken: string | undefined = req.cookies['access_token'];
    const refreshToken: string | undefined = req.cookies['refresh_token'];
    try {
      if (!accessToken) {
        // 401이냐 403이냐 선택 중 401로 하라는 글 있음
        throw new HttpException('액세스 토큰 없음', 401);
      }
      const accessTokenData = await this.jwtService.verify(accessToken, {
        secret: this.configService.get('auth.access_token_secret'),
      });
      req.userId = accessTokenData.userId;
      const diff = accessTokenData.exp * 1000 - new Date().getTime();
      // access token의 만료시간이 30분 밑으로 남았을 때
      if (diff < 1000 * 60 * 30 && refreshToken) {
        await this.authService.refresh(res, refreshToken);
      }
    } catch (e) {
      if (!refreshToken) return next();
      try {
        const userId = await this.authService.refresh(res, refreshToken);
        req.userId = userId;
      } catch (e) {}
    }
    return next();
  }
}
