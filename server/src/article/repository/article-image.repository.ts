import { EntityRepository, Repository } from 'typeorm';
import { ArticleImage } from '@/article/entity';

@EntityRepository(ArticleImage)
export class ArticleImageRepository extends Repository<ArticleImage> {
  async createImage(articleId: number, fileName: string) {
    await this.insert({ fileName: fileName, fk_article_id: articleId });
  }
}
