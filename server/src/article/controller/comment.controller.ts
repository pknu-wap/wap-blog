import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentService } from '../service';
import { CommentArticleDto } from '../dto';
import { Public } from '@/common/decorator';

@Controller('/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Public()
  @Get('/:id')
  async commentbyId(@Param('id') id: number) {
    return this.commentService.cmtbyId(id);
  }

  @Post('/write:id')
  async comment_article(
    @Body() comment: CommentArticleDto,
    @Param('id') id: number,
  ) {
    return this.commentService.cmtarticle(comment, id);
  }

  @Patch('/update:id')
  update(@Param('id') id: number, @Body() commentdto: CommentArticleDto) {
    return this.commentService.update(+id, commentdto);
  }

  @Delete('/delete:id')
  remove(@Param('id') id: number) {
    return this.commentService.remove(+id);
  }
}
