import { EntityRepository, Repository } from 'typeorm';
import { Image } from '@/article/entity';

@EntityRepository(Image)
export class ImageRepository extends Repository<Image> {
  async uploadImage(articleId: number, key: string): Promise<void> {
    const image = new Image();
    image.fk_article_id = articleId;
    image.key = key;
    await this.save(image);
  }

  async keysByID(articleId: number): Promise<Image[]> {
    return await this.find({
      where: { fk_article_id: articleId },
    });
  }
}
