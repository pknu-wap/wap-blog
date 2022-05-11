import {
  Controller,
  Post,
  Get,
  UploadedFiles,
  UseInterceptors,
  Res,
  Body,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageService } from '../service/index';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';
import 'dotenv/config';
import { Public } from '@/common/decorator';
import { ApiTags } from '@nestjs/swagger';
import { ImageDto } from '@/article/dto';

const s3 = new AWS.S3();
// AWS.config.update({
//   "accessKeyId": process.env.S3_ACCESS_KEY,
//   "secretAccessKey": process.env.S3_SECRET_KEY,
//   "region": process.env.S3_REGION
// })
// aws-sdk에서 .env의 aws config 알아서 대입하는 듯

@Public()
@ApiTags('image')
@Controller('/image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('/upload/:id')
  @UseInterceptors(
    FilesInterceptor('images', 5, {
      storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET,
        acl: 'public-read-write',
        key: function (req, file, cb) {
          cb(null, `${Date.now().toString()}-${file.originalname}`);
        },
      }),
      limits: { fileSize: 1024 * 1024 * 5 },
      fileFilter: function (req, file, cb) {
        if (
          file.mimetype == 'image/png' ||
          file.mimetype == 'image/jpg' ||
          file.mimetype == 'image/jpeg'
        ) {
          file.originalname = file.originalname.toLowerCase();
          cb(null, true);
        } else {
          cb(
            new Error("There's something in the file that's not an image"),
            false,
          );
        }
      },
    }),
  )
  async uploadImage(@UploadedFiles() files, @Param('id') articleId: number) {
    // files type 어떻게?
    const keys = [];
    files.map(file => keys.push(file.key));
    return this.imageService.uploadImage(articleId, keys);
  }

  @Get('/download')
  async getImage(@Res() res: Response, @Body() body: ImageDto) {
    return this.imageService.getImage(res, body.key);
  }

  @Get('/download/:id')
  async getImageById(@Res() res: Response, @Param('id') articleId: number) {
    return this.imageService.getImageById(res, articleId);
  }
}
