import { HttpException, Injectable } from '@nestjs/common';
import { UpdateArticleDto, CreateArticleDto } from '@/article/dto';
import { ArticleRepository, TagRepository } from '@/article/repository';
import { Article } from '@/article/entity';
@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly tagRepository: TagRepository,
  ) {}

  async getAllArticles(): Promise<Article[]> {
    return await this.articleRepository.find();
  }

  async getArticleById(id: number): Promise<Article> {
    return await this.articleRepository.findArticleById(id);
  }

  async createArticle(userId: number, dto: CreateArticleDto): Promise<void> {
    const tags = await this.tagRepository.createTags(dto.tags);
    await this.articleRepository.createArticle(userId, tags, dto);
  }

  async updateArticle(
    userId: number,
    articleId: number,
    dto: UpdateArticleDto,
  ): Promise<void> {
    const article = await this.articleRepository.findArticleById(articleId);
    if (article.fk_user_id !== userId) {
      throw new HttpException('This is not your article.', 401);
    }
    await this.articleRepository.updateArticle(articleId, dto);
  }

  async deleteArticle(userId: number, articleId: number): Promise<void> {
    const article = await this.articleRepository.findArticleById(articleId);
    if (article.fk_user_id !== userId) {
      throw new HttpException('This is not your article.', 401);
    }
    await this.articleRepository.deleteArticle(articleId);
  }
}
