import { EntityRepository, Repository } from 'typeorm';
import { Comment } from '@/article/entity';
import { CreateCommentDto } from '@/article/dto';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  async findCommentsByArticleId(articleId: number): Promise<Comment[]> {
    return await this.find({ fk_article_id: articleId });
  }

  async createComment(
    userId: number,
    articleId: number,
    dto: CreateCommentDto,
  ): Promise<void> {
    const comment = new Comment();
    comment.text = dto.text;
    comment.fk_article_id = articleId;
    comment.fk_user_id = userId;

    await this.save(comment);
  }

  async updateComment(commentId: number, dto: CreateCommentDto): Promise<void> {
    const comment = await this.findOne({ id: commentId });
    comment.text = dto.text;
    await this.save(comment);
  }

  async deleteComment(id: number): Promise<void> {
    await this.delete(id);
  }
}
