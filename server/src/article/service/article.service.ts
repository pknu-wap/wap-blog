import { Injectable } from '@nestjs/common';
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

  async updateArticle(id: number, dto: UpdateArticleDto): Promise<void> {
    await this.articleRepository.updateArticle(id, dto);
  }

  async deleteArticle(articleId: number): Promise<void> {
    await this.articleRepository.deleteArticle(articleId);
  }
}
