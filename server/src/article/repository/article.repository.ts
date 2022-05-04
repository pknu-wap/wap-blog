import { EntityRepository, Repository, getConnection } from 'typeorm';
import { Article, Tag } from '@/article/entity';
import { CreateArticleDto, UpdateArticleDto } from '@/article/dto';

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
  async findAllArticles(): Promise<Article[]> {
    return await this.find();
  }
  async findArticleById(id: number): Promise<Article> {
    return await this.findOne({ id });
  }

  async createArticle(
    userId: number,
    tags: Tag[],
    dto: CreateArticleDto,
  ): Promise<Article> {
    const article = new Article();
    article.title = dto.title;
    article.description = dto.description;
    article.body = dto.body;
    article.fk_user_id = userId;
    article.tags = tags;

    return await this.save(article);
  }

  async updateArticle(id: number, dto: UpdateArticleDto): Promise<void> {
    // writer 안 받아도 되는데 일단 keep
    await getConnection()
      .createQueryBuilder()
      .update(Article)
      .set({
        title: dto.title,
        description: dto.description,
      })
      .where('id = :id', { id: id })
      .execute();
    return;
  }

  async deleteArticle(articleId: number): Promise<void> {
    await this.delete({ id: articleId });
  }
}
