import { HttpException, Injectable } from '@nestjs/common';
import { UpdateArticleDto, CreateArticleDto } from '@/article/dto';
import { ArticleRepository } from '@/article/repository';
import { Article } from '@/article/entity';
import { UserRepository } from '@/user/repository';
import { ArticleImageService } from './article-image.service';
import { TagService } from './tag.service';
@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly userRepository: UserRepository,
    private readonly articleImageService: ArticleImageService,
    private readonly tagService: TagService,
  ) {}

  async getAllArticles(): Promise<Article[]> {
    return await this.articleRepository.findAllArticles();
  }

  async getArticles(username: string, tag?: string) {
    const user = await this.userRepository.findByName(username);
    return await this.articleRepository.findArticles(user, tag);
  }

  async getArticleById(articleId: number): Promise<Article> {
    const article = await this.articleRepository.findArticleById(articleId);
    if (!article) throw new HttpException('존재하지 않는 article입니다', 404);
    return article;
  }

  async createArticle(
    userId: number,
    dto: CreateArticleDto,
    file?: Express.Multer.File,
  ): Promise<void> {
    const article = await this.articleRepository.createArticle(userId, dto);
    if (dto.tagList) {
      const tagList: string[] = JSON.parse(dto.tagList);
      await this.tagService.addTagList(article, tagList);
    }
    if (file) await this.articleImageService.addImage(article.id, file);
  }

  // async updateArticle(
  //   userId: number,
  //   articleId: number,
  //   dto: UpdateArticleDto,
  // ): Promise<void> {
  //   const article = await this.articleRepository.findArticleById(articleId);
  //   if (!article) throw new HttpException('존재하지 않는 article입니다', 404);
  //   if (article.fk_user_id !== userId)
  //     throw new HttpException('당신의 article이 아닙니다.', 401);
  //   const tagList = await this.tagRepository.createTags(dto.tagList);
  //   await this.articleRepository.updateArticle(articleId, tagList, dto);
  // }

  async deleteArticle(userId: number, articleId: number): Promise<void> {
    const article = await this.articleRepository.findArticleById(articleId);
    if (!article) throw new HttpException('존재하지 않는 article입니다', 404);
    if (article.fk_user_id !== userId)
      throw new HttpException('당신의 article이 아닙니다.', 401);
    await this.articleRepository.deleteArticle(articleId);
  }
}
