import { Module } from '@nestjs/common';
import { AuthController } from '@/auth/controller';
import { AuthService, GoogleService, GithubService } from '@/auth/service';
import { UserRepository } from '@/user/repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@/user/service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, UserService, GithubService, GoogleService],
  exports: [AuthService],
})
export class AuthModule {}
