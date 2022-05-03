import { EntityRepository, Repository, getConnection } from 'typeorm';
import { Article } from '@/article/entity/article.entity';
import { UpdateArticleDto } from '@/article/dto/index';

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
  async findarticle(id: number): Promise<Article> {
    const article = await this.findOne(id);
    return article;
  }

  async atcbyTag(tag: string){
    const article = await getConnection()
    .createQueryBuilder()
    .select("article")
    .from(Article, "article")
    .where("tag=:tag", {tag: tag})
    .getMany()
    return article;
  }

  async atcbyUser(user: string){
    const article = await getConnection()
    .createQueryBuilder()
    .select("article")
    .from(Article, "article")
    .where("writer=:user", {user: user})
    .getMany()
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
        subtitle: dto.subtitle,
        body: dto.body,
      })
      .where('id = :id', { id: id })
      .execute();
    return;
  }
}
