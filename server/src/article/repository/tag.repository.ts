import { EntityRepository, Repository } from 'typeorm';
import { Tag } from '@/article/entity/tag.entity';

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  async findAllTags(): Promise<Tag[]> {
    return await this.find();
  }

  async findByName(name: string): Promise<Tag> {
    const tag = await this.findOne({ name });
    return tag;
  }

  async findOrCreate(name: string) {
    const tag = await this.findByName(name);
    if (tag) {
      return tag;
    }
    const newTag = new Tag();
    newTag.name = name;
    return await this.save(newTag);
  }

  async createTags(tags: string[]) {
    const tagsData = await Promise.all(
      tags.map(data => {
        return this.findOrCreate(data);
      }),
    );
    return tagsData;
  }
}
