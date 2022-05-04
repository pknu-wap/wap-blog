import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ArticleService } from '@/article/service';
import { CreateArticleDto, UpdateArticleDto } from '@/article/dto';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId, Public } from '@/common/decorator';
import { Article } from '@/article/entity';

@ApiTags('article')
@Controller('/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Public()
  @Get('/')
  getAllArticles(): Promise<Article[]> {
    return this.articleService.getAllArticles();
  }

  @Public()
  @Get('/:id')
  async getArticleById(@Param('id') id: number): Promise<Article> {
    return this.articleService.getArticleById(id);
  }

  @Post('/')
  async createArticle(
    @GetCurrentUserId() userId: number,
    @Body() body: CreateArticleDto,
  ): Promise<void> {
    await this.articleService.createArticle(userId, body);
  }

  @Patch('/:id')
  async updateArticle(
    @GetCurrentUserId() userId: number,
    @Param('id') articleId: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<void> {
    await this.articleService.updateArticle(
      userId,
      articleId,
      updateArticleDto,
    );
  }

  @Delete('/:id')
  async deleteArticle(
    @GetCurrentUserId() userId: number,
    @Param('id') articleId: number,
  ): Promise<void> {
    await this.articleService.deleteArticle(userId, articleId);
  }
}
