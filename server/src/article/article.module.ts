import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ArticleController,
  CommentController,
  TagController,
} from '@/article/controller';
import { CommentService, ArticleService, TagService } from '@/article/service';
import {
  ArticleImageRepository,
  ArticleRepository,
  CommentRepository,
  TagRepository,
} from '@/article/repository';
import { UserRepository } from '@/user/repository';
import { S3Service } from '@/s3/s3.service';
import { ArticleImageService } from './service/article-image.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArticleRepository,
      CommentRepository,
      TagRepository,
      UserRepository,
      ArticleImageRepository,
    ]),
  ],
  controllers: [ArticleController, CommentController, TagController],
  providers: [
    ArticleService,
    CommentService,
    TagService,
    ArticleImageService,
    S3Service,
  ],
})
export class ArticleModule {}
