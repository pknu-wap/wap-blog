import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ArticleService } from '@/article/service';
import { CreateArticleDto, UpdateArticleDto } from '@/article/dto';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId, Public } from '@/common/decorator';
import { Article } from '@/article/entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '@/utils/multerOptions';

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
  async getArticleById(@Param('id') articleId: number): Promise<Article> {
    return this.articleService.getArticleById(articleId);
  }

  @Public()
  @Get('/user/:username')
  getArticles(
    @Param('username') username: string,
    @Query('tag') tag?: string,
  ): Promise<Article[]> {
    return this.articleService.getArticles(username, tag);
  }

  @Post('/')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async createArticle(
    @GetCurrentUserId() userId: number,
    @Body() body: CreateArticleDto,
    @UploadedFile() file: Express.Multer.File, //Array<Express.Multer.File>
  ): Promise<void> {
    //TODO: 태그리스트는 언젠가는 해결하는 걸로
    body.tagList = [];
    await this.articleService.createArticle(userId, body, file);
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
