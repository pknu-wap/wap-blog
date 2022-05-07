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

  async findUserTags(userId: number) {
    const tagList = this.manager.query(
      `
      select tag.id, tag.name, articles_count from (
        select count(fk_article_id) as articles_count, fk_tag_id from article_tags
        inner join article on article.id = fk_article_id
          and article.fk_user_id = ?
        group by fk_tag_id
      ) as q inner join tag on q.fk_tag_id = tag.id
      order by articles_count desc
    `,
      [userId],
    );
    return tagList;
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
