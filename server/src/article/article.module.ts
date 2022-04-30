import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleRepository, CommentRepository } from './repository';
import { CommentController, ArticleController } from './controller';
import { CommentService,ArticleService } from './service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleRepository]),
    TypeOrmModule.forFeature([CommentRepository])
  ],
  controllers: [ArticleController, CommentController],
  providers: [ArticleService, CommentService],
})
export class ArticleModule {}
