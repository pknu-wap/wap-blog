import { EntityRepository, Repository } from 'typeorm';
import { Article, ArticleImage } from '@/article/entity';

@EntityRepository(Article)
export class ArticleImageRepository extends Repository<ArticleImage> {
  async createImage(articleId: number, fileName: string) {
    await this.insert({ fileName: fileName, fk_article_id: articleId });
  }
}
