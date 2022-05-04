import { HttpException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from '@/article/dto';
import { ArticleRepository, CommentRepository } from '@/article/repository';
import { Comment } from '@/article/entity';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly articleRepository: ArticleRepository,
  ) {}

  async getCommentsByArticleId(articleId: number): Promise<Comment[]> {
    const article = await this.articleRepository.findArticleById(articleId);
    if (!article) throw new HttpException('존재하지 않는 article입니다', 404);
    return await this.commentRepository.findCommentsByArticleId(articleId);
  }

  async createComment(
    userId: number,
    articleId: number,
    dto: CreateCommentDto,
  ): Promise<void> {
    const article = await this.articleRepository.findArticleById(articleId);
    if (!article) throw new HttpException('존재하지 않는 article입니다', 404);
    await this.commentRepository.createComment(userId, articleId, dto);
  }

  async updateComment(
    userId: number,
    commentId: number,
    dto: CreateCommentDto,
  ): Promise<void> {
    const comment = await this.commentRepository.findOne({ id: commentId });
    if (!comment) throw new HttpException('존재하지 않는 comment입니다', 404);
    if (comment.fk_user_id !== userId)
      throw new HttpException('당신의 comment가 아닙니다.', 401);
    await this.commentRepository.updateComment(commentId, dto);
  }

  async deleteComment(userId: number, commentId: number): Promise<void> {
    const comment = await this.commentRepository.findOne({ id: commentId });
    if (!comment) throw new HttpException('존재하지 않는 comment입니다', 404);
    if (comment.fk_user_id !== userId)
      throw new HttpException('당신의 comment가 아닙니다.', 401);
    await this.commentRepository.deleteComment(commentId);
  }
}
