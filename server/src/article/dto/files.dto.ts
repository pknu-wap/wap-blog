import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class FilesDtos {
  // [
  //   {
  //     fieldname: 'images',
  //     originalname: '축구.png',
  //     encoding: '7bit',
  //     mimetype: 'image/png',
  //     size: 539058,
  //     bucket: 'wow-first',
  //     key: '1652110517633-축구.png',
  //     acl: 'public-read-write',
  //     contentType: 'application/octet-stream',
  //     contentDisposition: null,
  //     contentEncoding: null,
  //     storageClass: 'STANDARD',
  //     serverSideEncryption: null,
  //     metadata: null,
  //     location: 'https://wow-first.s3.ap-northeast-2.amazonaws.com/1652110517633-%EC%B6%95%EA%B5%AC.png',
  //     etag: '"bd3882e67b2bea263372268c76afafeb"',
  //     versionId: undefined
  //   }
  // ]
}
