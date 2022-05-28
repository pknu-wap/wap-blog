import { S3Service } from '@/provider/s3/s3.service';
import { Injectable } from '@nestjs/common';
import { ArticleImageRepository } from '../repository';

@Injectable()
export class ArticleImageService {
  constructor(
    private readonly articleImageRepository: ArticleImageRepository,
    private readonly s3Service: S3Service,
  ) {}
  async addImages(articleId: number, files: Array<Express.Multer.File>) {
    files?.forEach(async file => {
      const fileName = `${Date.now()}-${file.originalname}`;
      await this.s3Service.putObject(fileName, file);
      await this.articleImageRepository.createImage(articleId, fileName);
    });
  }

  async addImage(articleId: number, file: Express.Multer.File) {
    const fileName = `${Date.now()}-${file.originalname}`;
    await this.s3Service.putObject(fileName, file);
    await this.articleImageRepository.createImage(articleId, fileName);
  }
}
