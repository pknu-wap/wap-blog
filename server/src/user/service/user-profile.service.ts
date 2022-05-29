import { S3Service } from '@/provider/s3/s3.service'
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserProfileRepository } from '../repository';

@Injectable()
export class UserProfileService {
  constructor(
    private readonly userRepository: UserProfileRepository,
    private readonly s3Service: S3Service,
  ) {}

  async profileUp(userId: number, file: Express.Multer.File){
    const fileName = `${Date.now()}-${file.originalname}`;
    const res = await this.userRepository.createProfile(userId, fileName);
    if (res===false)  throw new BadRequestException("exist profile");
    await this.s3Service.putObject(fileName, file, "profile");
    return;
  }

  async profileDel(userId: number){
    await this.userRepository.deleteProfile(userId);
  }
}
