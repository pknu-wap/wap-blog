import { Injectable } from '@nestjs/common';
import { ImageRepository } from '@/article/repository';
import * as AWS from 'aws-sdk';

const s3 = new AWS.S3()

@Injectable()
export class ImageService {
  constructor(
    private readonly Imgrepo: ImageRepository,
  ) {}

  async uploadImage(keys :string[]) {
    console.log("image upload service logic");
    return;
  }

  async getImage(res){
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: "1652035226988-축구.PNG"
    }
    s3.getObject(params, async(err, data)=>{
      if (err){
        console.log(err)
        res.sendStatus(404);
      }else{
        console.log(data)
        res.send(data.Body)
      }
    })
  }
}
