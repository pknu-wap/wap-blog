import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArticleService } from '../service/article.service';
import { CreateArticleDto } from '../dto/create-article.dto';
import { UpdateArticleDto } from '../dto/update-article.dto';

@Controller('/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  allarticle() {
    return this.articleService.allarticle();
  }

  @Get("/:id")
  async article(@Param('id') id: number) {
    return this.articleService.article(+id);
  }

  @Post("/create")
  async create(@Body() body: CreateArticleDto) {
    return this.articleService.create(body);
  }

  @Patch('/update:id')
  update(@Param('id') id: number, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete('/delete:id')
  remove(@Param('id') id: number) {
    return this.articleService.remove(+id);
  }

  @Patch('/restore:id')
  restore(@Param('id') id: number){
    return this.articleService.restore(+id);
  }
}
