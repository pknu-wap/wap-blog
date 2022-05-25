import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '@/user/controller';
import { UserService, UserProfileService } from '@/user/service';
import { S3Service } from '@/s3/s3.service';
import { UserRepository, UserProfileRepository } from '@/user/repository';

@Module({
  imports: [TypeOrmModule.forFeature([
    UserRepository,
    UserProfileRepository
  ])],
  controllers: [UserController],
  providers: [
    UserService, 
    UserProfileService,
    S3Service,
  ],
})
export class UserModule {}
