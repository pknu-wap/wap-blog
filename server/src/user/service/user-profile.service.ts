import { S3Service } from '@/s3/s3.service';
import { Injectable } from '@nestjs/common';
import { UserProfileRepository } from '../repository';

@Injectable()
export class UserProfileService {
  constructor(
    private readonly userRepository: UserProfileRepository,
    private readonly s3Service: S3Service,
    ) {}

  async profileUp(userId: number, file: Express.Multer.File){
    console.log("~~~~~~") //대문자 처리 없음
    const fileName = `${Date.now()}-${file.originalname}`;
    await this.s3Service.putObject(fileName, file, "profile");
    if (!userId){
      return new Error("~~")
    }
    await this.userRepository.createProfile(userId, fileName);
    return;
  }
}