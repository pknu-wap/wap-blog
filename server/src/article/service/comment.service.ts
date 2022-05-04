import { Injectable } from '@nestjs/common';
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

  async updateComment(id: number, dto: CreateCommentDto): Promise<void> {
    await this.commentRepository.updateComment(id, dto);
  }

  async deleteComment(id: number): Promise<void> {
    await this.commentRepository.deleteComment(id);
  }
}
