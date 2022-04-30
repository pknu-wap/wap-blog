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
export class CommentController{
    constructor(private readonly commentService: CommentService) {}

    @Post('/')
    async comment_article(@Body() comment: CommentArticleDto){
        return this.commentService.cmtarticle(comment)
    }
}