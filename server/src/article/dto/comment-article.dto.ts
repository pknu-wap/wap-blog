import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Article } from '../entity';

export class CommentArticleDto {
  @ApiProperty()
  @IsNotEmpty()
  commentor: string;

  @ApiProperty()
  @IsNotEmpty()
  comment: string;
}