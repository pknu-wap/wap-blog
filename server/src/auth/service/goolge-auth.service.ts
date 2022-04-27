import { UserRepository } from '@/user/repository';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable, Res } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GoogleService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async googleCallback(code: string, @Res() res: Response) {
    return;
  }
}
