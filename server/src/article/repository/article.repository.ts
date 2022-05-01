import { EntityRepository, Repository, getConnection } from 'typeorm';
import { Article } from '@/article/entity/article.entity';
import { UpdateArticleDto } from '@/article/dto/index';

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
  async findarticle(id: number): Promise<Article> {
    const article = await this.findOne(id);
    return article;
  }

  async uparticle(id: number, dto: UpdateArticleDto): Promise<Article> {
    // writer 안 받아도 되는데 일단 keep
    await getConnection()
      .createQueryBuilder()
      .update(Article)
      .set({
        tag: dto.tag,
        title: dto.title,
        description: dto.description,
      })
      .where('id = :id', { id: id })
      .execute();
    return;
  }
}
