import {
  HttpException,
  Injectable,
  NestMiddleware,
  Next,
  Req,
  Res,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

// 토큰 갱신 관련 미들웨어
@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  async use(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    const accessToken: string | undefined = req.cookies.access_token;
    const refreshToken: string | undefined = req.cookies.refresh_token;

    try {
      if (!accessToken) {
        // 401이냐 403이냐 선택 중 401로 하라는 글 있음
        throw new HttpException('액세스 토큰 없음', 401);
      }
      const decodedData = await this.jwtService.verify(accessToken);
      const diff = decodedData.exp * 1000 - new Date().getTime();
      if (diff < 1000 * 60 * 30 && refreshToken) {
        //TODO: 구현하던가 불러오던가 해야함
        await refreshToken(refreshToken);
      }
    } catch (e) {
      if (!refreshToken) return next();
      //TODO: 구현하던가 불러오던가 해야함
      await refreshToken();
    }
    return next();
  }
}
