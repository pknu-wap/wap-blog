import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  body: string;

  @ApiProperty()
  @Optional()
  tagList?: string[];
}
