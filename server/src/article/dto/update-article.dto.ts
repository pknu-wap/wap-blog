import { PartialType } from '@nestjs/swagger';
import { CreateArticleDto } from '@/article/dto';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
