import { Injectable } from '@nestjs/common';
import { TagRepository } from '@/article/repository/tag.repository';
import { Tag } from '@/article/entity';

@Injectable()
export class TagService {
  constructor(private readonly tagRepostory: TagRepository) {}

  async getAllTags(): Promise<Tag[]> {
    return await this.tagRepostory.findAllTags();
  }
}
