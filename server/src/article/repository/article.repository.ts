import { EntityRepository, Repository } from 'typeorm';
import { Article } from '@/article/entity';
import { CreateArticleDto, UpdateArticleDto } from '@/article/dto';
import { User } from '@/user/entity';
import { HttpException } from '@nestjs/common';

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
  async findAllArticles(cursor?: number): Promise<Article[]> {
    const articles = this.createQueryBuilder('article')
      .limit(10)
      .orderBy('article.createdAt', 'DESC')
      .addOrderBy('article.id', 'DESC')
      .leftJoin('article.user', 'user')
      .leftJoinAndSelect('article.tagList', 'tag')
      .leftJoinAndSelect('article.images', 'article_image')
      .addSelect([
        'user.id',
        'user.username',
        'user.email',
        'user.createdAt',
        'user.updatedAt',
      ])
      .loadRelationCountAndMap('article.comments_count', 'article.comments');

    if (cursor) {
      const article = await this.findOne({ id: cursor });
      if (!article) {
        throw new HttpException('존재하지 않는 Cursor입니다', 404);
      }
      articles.andWhere('article.createdAt < :date', {
        date: article.createdAt,
      });
      articles.orWhere('article.createdAt = :date AND article.id < :id', {
        date: article.createdAt,
        id: article.id,
      });
    }
    return await articles.getMany();
  }

  async findArticles(user: User, tag?: string): Promise<Article[]> {
    const articles = this.createQueryBuilder('article')
      .leftJoinAndSelect('article.user', 'user')
      .where('article.fk_user_id = :id', { id: user.id })
      .leftJoinAndSelect('article.tagList', 'tag')
      .leftJoinAndSelect('article.comments', 'comments')
      .addOrderBy('comments.createdAt', 'DESC')
      .leftJoinAndSelect('comments.user', 'comment_user')
      .leftJoinAndSelect('article.images', 'article_image');
    if (tag) {
      articles.andWhere('tag.name = :name', { name: tag });
    }
    return await articles.orderBy('article.createdAt', 'DESC').getMany();
  }

  async findArticleById(id: number): Promise<Article> {
    const article = this.createQueryBuilder('article')
      .where('article.id = :id', { id })
      .leftJoinAndSelect('article.user', 'user')
      .leftJoinAndSelect('article.tagList', 'tag')
      .leftJoinAndSelect('article.comments', 'comments')
      .addOrderBy('comments.createdAt', 'DESC')
      .leftJoinAndSelect('comments.user', 'comment_user')
      .leftJoinAndSelect('article.images', 'article_image');
    return await article.getOne();
  }

  async createArticle(userId: number, dto: CreateArticleDto): Promise<Article> {
    const article = new Article();
    article.title = dto.title;
    article.description = dto.description;
    article.body = dto.body;
    article.fk_user_id = userId;

    return await this.save(article);
  }

  // async updateArticle(
  //   articleId: number,
  //   tagList: Tag[],
  //   dto: UpdateArticleDto,
  // ): Promise<void> {
  //   const article = await this.findArticleById(articleId);
  //   article.title = dto.title;
  //   article.description = dto.description;
  //   article.body = dto.body;
  //   article.tagList = tagList;
  //   await this.save(article);
  // }

  //TODO: tag가 같이 삭제되어야 하는데 ManyToMany만 삭제되고 태그가 삭제 안 됨
  async deleteArticle(articleId: number): Promise<void> {
    const article = await this.findArticleById(articleId);
    await this.remove(article);
  }
}
