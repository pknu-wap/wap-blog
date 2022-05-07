import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentService } from '@/article/service';
import { CreateCommentDto } from '@/article/dto';
import { GetCurrentUserId, Public } from '@/common/decorator';
import { Comment } from '@/article/entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('comment')
@Controller('/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Public()
  @Get('/:articleId')
  async getCommentsByArticleId(
    @Param('articleId') articleId: number,
  ): Promise<Comment[]> {
    return this.commentService.getCommentsByArticleId(articleId);
  }

  @Post('/:articleId')
  async createComment(
    @GetCurrentUserId() userId: number,
    @Param('articleId') articleId: number,
    @Body() comment: CreateCommentDto,
  ): Promise<void> {
    await this.commentService.createComment(userId, articleId, comment);
  }

  @Patch('/:id')
  async updateComment(
    @GetCurrentUserId() userId: number,
    @Param('id') commentId: number,
    @Body() commentdto: CreateCommentDto,
  ): Promise<void> {
    await this.commentService.updateComment(userId, commentId, commentdto);
  }

  @Delete('/:id')
  async deleteComment(
    @GetCurrentUserId() userId: number,
    @Param('id') commentId: number,
  ): Promise<void> {
    await this.commentService.deleteComment(userId, commentId);
  }
}
