import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class ImageDto {
  @ApiProperty()
  @IsNotEmpty()
  key: string;
}
