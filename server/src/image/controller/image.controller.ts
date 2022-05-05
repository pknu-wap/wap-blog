import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageService } from '../service/index';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';
import 'dotenv/config';
import { Public } from '@/common/decorator';

const s3 = new AWS.S3()

@Public()
@Controller('image')
export class ImageController {
  constructor (
    private readonly imageService: ImageService
  ) {}
  
  // filesinterceptor에서 먼가 multer filter를 걸 수 있을 듯
  @Post()
  @UseInterceptors(FilesInterceptor('images', 5, {
    storage: multerS3({
      s3: s3,
      bucket: process.env.AWS_S3_BUCKET_NAME,
      acl: 'public-read-write',
      key: function(req, file, cb) {
        cb(null, `${Date.now().toString()}-${file.originalname}`)
        console.log(file);
      }
    })
  }))
  async uploadImage(@UploadedFiles() files: Express.Multer.File) {
    return this.imageService.uploadImage(files);
  }
}