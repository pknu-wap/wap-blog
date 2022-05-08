import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@/common/decorator';
import { TagService } from '@/article/service';
import { Tag } from '@/article/entity';

@ApiTags('tag')
@Controller('/tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Public()
  @Get('/')
  async getAllTags(): Promise<Tag[]> {
    return this.tagService.getAllTags();
  }

  @Public()
  @Get('/:username')
  async getUserTags(@Param('username') username: string) {
    return await this.tagService.getUserTags(username);
  }
}
