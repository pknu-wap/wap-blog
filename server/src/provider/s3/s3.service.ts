import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  s3Client: S3Client;
  bucket: string;
  constructor(private readonly configServie: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configServie.get<string>('s3.region'),
      credentials: {
        accessKeyId: this.configServie.get<string>('s3.accessKey'),
        secretAccessKey: this.configServie.get<string>('s3.secretKey'),
      },
    });
    this.bucket = this.configServie.get<string>('s3.bucket');
  }

  async putObject(fileName: string, file: Express.Multer.File) {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: fileName,
      Body: file.buffer,
    });
    return await this.s3Client.send(command);
  }

  async deleteObject(fileName: string) {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: fileName,
    });
    return await this.s3Client.send(command);
  }
}
