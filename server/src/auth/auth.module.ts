import { Module } from '@nestjs/common';
import { AuthController } from '@/auth/controller';
import { AuthService } from '@/auth/service';
import { UserRepository } from '@/user/repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@/user/service';
import { GithubService } from '@/auth/service/github-auth.service';
import { GoogleService } from '@/auth/service/goolge-auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, UserService, GithubService, GoogleService],
  exports: [AuthService],
})
export class AuthModule {}
