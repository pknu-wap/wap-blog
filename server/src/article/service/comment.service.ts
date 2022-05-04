import { HttpException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from '@/article/dto';
import { CommentRepository } from '@/article/repository';
import { Comment } from '@/article/entity';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async getCommentsByArticleId(articleId: number): Promise<Comment[]> {
    return await this.commentRepository.findCommentsByArticleId(articleId);
  }

  async createComment(
    userId: number,
    articleId: number,
    dto: CreateCommentDto,
  ): Promise<void> {
    await this.commentRepository.createComment(userId, articleId, dto);
  }

  async updateComment(
    userId: number,
    commentId: number,
    dto: CreateCommentDto,
  ): Promise<void> {
    const comment = await this.commentRepository.findOne({ id: commentId });
    if (comment.fk_user_id !== userId) {
      throw new HttpException('This is not your comment.', 401);
    }
    await this.commentRepository.updateComment(commentId, dto);
  }

  async deleteComment(userId: number, commentId: number): Promise<void> {
    const comment = await this.commentRepository.findOne({ id: commentId });
    if (comment.fk_user_id !== userId) {
      throw new HttpException('This is not your comment.', 401);
    }
    await this.commentRepository.deleteComment(commentId);
  }
}
