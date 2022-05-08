import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ArticleController,
  CommentController,
  TagController,
  ImageController
} from '@/article/controller';
import { CommentService, ArticleService, TagService, ImageService } from '@/article/service';
import {
  ArticleRepository,
  CommentRepository,
  TagRepository,
} from '@/article/repository';
import { UserRepository } from '@/user/repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArticleRepository,
      CommentRepository,
      TagRepository,
      UserRepository,
    ]),
  ],
  controllers: [ArticleController, CommentController, TagController, ImageController],
  providers: [ArticleService, CommentService, TagService, ImageService],
})
export class ArticleModule {}
