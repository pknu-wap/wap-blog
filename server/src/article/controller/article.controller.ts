import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ArticleService } from '../service/article.service';
import { CreateArticleDto } from '../dto/create-article.dto';
import { UpdateArticleDto } from '../dto/update-article.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@/common/decorator';

@ApiTags('article')
@Controller('/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Public()
  @Get('/')
  allarticle() {
    return this.articleService.allarticle();
  }

  // /:id
  // /test 순으로 배치하면 에러남
  // 같은 Get에서 저렇게하면 test도 id로 받아들인다는 듯
  // 라우터 순서 주의하자
  @Public()
  @Get('/:id')
  async article(@Param('id') id: number) {
    return this.articleService.article(+id);
  }

  @Public()
  @Get('/tag/:tag')
  async articletag(@Param('tag') tag: string){
    return this.articleService.articletag(tag);
  }

  @Public()
  @Get('/user/:user')
  async articleUser(@Param('user') user: string){
    return this.articleService.articleUser(user);
  }

  @Post('/create')
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
  restore(@Param('id') id: number) {
    return this.articleService.restore(+id);
  }
}
