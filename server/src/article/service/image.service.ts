import { Injectable } from '@nestjs/common';
import { ImageRepository } from '@/article/repository';
import { Response } from 'express';
import * as AWS from 'aws-sdk';

const s3 = new AWS.S3();

@Injectable()
export class ImageService {
  constructor(private readonly Imgrepo: ImageRepository) {}

  async uploadImage(articleid: number, keys: string[]) {
    keys.map(key => this.Imgrepo.uploadImage(articleid, key));
    return 'image upload';
  }

  async getImage(res: Response, key: string) {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    };
    s3.getObject(params, async (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(404);
      } else {
        console.log(data);
        res.send(data.Body);
      }
    });
  }

  async getImageById(res: Response, articleId: number) {
    const res_img = [];
    const imgs = await this.Imgrepo.keysByID(articleId);
    const leng = imgs.length;
    imgs.map((img, i) => {
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: img.key,
      };
      s3.getObject(params, (err, data) => {
        if (err) {
          console.log(err);
          res.sendStatus(404);
        } else {
          if (i === leng - 1) {
            console.log('a', i, leng);
            res_img.push(data.Body);
            console.log(res_img.length);
            res.send();
          } else {
            console.log('b', i, leng);
            res_img.push(data.Body);
          }
          // 비동기가 오락가락하는데
          // 사진 여러장 어떻게 줄까
          // s3.getObject를 promisify?
        }
      });
    });
  }
}
