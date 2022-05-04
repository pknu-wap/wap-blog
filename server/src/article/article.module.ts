import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ArticleController,
  CommentController,
  TagController,
} from '@/article/controller';
import { CommentService, ArticleService, TagService } from '@/article/service';
import {
  ArticleRepository,
  CommentRepository,
  TagRepository,
} from '@/article/repository';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArticleRepository,
      CommentRepository,
      TagRepository,
    ]),
  ],
  controllers: [ArticleController, CommentController, TagController],
  providers: [ArticleService, CommentService, TagService],
})
export class ArticleModule {}
