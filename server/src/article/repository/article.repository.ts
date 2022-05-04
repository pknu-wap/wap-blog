import { EntityRepository, Repository } from 'typeorm';
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

  async updateArticle(
    articleId: number,
    tags: Tag[],
    dto: UpdateArticleDto,
  ): Promise<void> {
    const article = await this.findArticleById(articleId);
    article.title = dto.title;
    article.description = dto.description;
    article.body = dto.body;
    article.tags = tags;
    await this.save(article);
  }

  //TODO: tag가 같이 삭제되어야 하는데 ManyToMany만 삭제되고 태그가 삭제 안 됨
  async deleteArticle(articleId: number): Promise<void> {
    const article = await this.findArticleById(articleId);
    await this.remove(article);
  }
}
