import { HttpException, Injectable } from '@nestjs/common';
import { UserRepository } from '@/user/repository';
import * as argon2 from 'argon2';
import { SigninRequestDto, SignupRequestDto } from '@/auth/dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IsNull, Not } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signupLocal(dto: SignupRequestDto) {
    //TODO: 이거 바꿀 예정
    dto.password = await this.hashData(dto.password);
    const user = this.userRepository.create(dto);
    this.userRepository.save(user);
  }

  async signinLocal(dto: SigninRequestDto) {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) throw new HttpException('NOT FOUND', 404);
    const passwordMatches = await this.compareData(user.password, dto.password);
    if (!passwordMatches) throw new HttpException('UNAUTHORIZED', 401);

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async signinGithub() {
    return;
  }

  async signinGoogle() {
    return;
  }

  async logout(userId: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
        hashedRt: Not(IsNull()),
      },
    });
    if (!user) throw new HttpException('NOT FOUND', 404);
    await this.userRepository.save({ ...user, hashedRt: null });
  }

  async refreshTokens(userId: number, refresh_token: string) {
    const user = await this.userRepository.findById(userId);
    if (!user || !user.hashedRt) throw new HttpException('BAD REQUEST', 404);
    const rtmatches = await this.compareData(user.hashedRt, refresh_token);
    if (!rtmatches) throw new HttpException('BAD REQUEST', 404);

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  compareData(hashedData: string, data: string) {
    return argon2.verify(hashedData, data);
  }

  async getTokens(userId: number, email: string) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        { userId, email, sub: 'access_token' },
        {
          secret: this.configService.get<string>('auth.access_token_secret'),
          expiresIn: '10s',
        },
      ),
      this.jwtService.signAsync(
        { userId, email, sub: 'refresh_token' },
        {
          secret: this.configService.get<string>('auth.refresh_token_secret'),
          expiresIn: '7d',
        },
      ),
    ]);
    return { access_token, refresh_token };
  }

  async updateRtHash(userId: number, rt: string) {
    const hash = await this.hashData(rt);
    return this.userRepository.update({ id: userId }, { hashedRt: hash });
  }
}
