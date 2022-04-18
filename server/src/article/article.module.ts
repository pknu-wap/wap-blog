import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleRepository } from './repository';
import { ArticleService } from './service/article.service';
import { ArticleController } from './controller/article.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleRepository])],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
