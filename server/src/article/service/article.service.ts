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
    return await this.articleRepository.findAllArticles();
  }

  async getArticleById(articleId: number): Promise<Article> {
    const article = await this.articleRepository.findArticleById(articleId);
    if (!article) throw new HttpException('존재하지 않는 article입니다', 404);
    return article;
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
    if (!article) throw new HttpException('존재하지 않는 article입니다', 404);
    if (article.fk_user_id !== userId)
      throw new HttpException('당신의 article이 아닙니다.', 401);
    const tags = await this.tagRepository.createTags(dto.tags);
    await this.articleRepository.updateArticle(articleId, tags, dto);
  }

  async deleteArticle(userId: number, articleId: number): Promise<void> {
    const article = await this.articleRepository.findArticleById(articleId);
    if (!article) throw new HttpException('존재하지 않는 article입니다', 404);
    if (article.fk_user_id !== userId)
      throw new HttpException('당신의 article이 아닙니다.', 401);
    await this.articleRepository.deleteArticle(articleId);
  }
}
