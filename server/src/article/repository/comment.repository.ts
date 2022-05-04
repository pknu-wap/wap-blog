import { EntityRepository, Repository, getConnection } from 'typeorm';
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

  async updateComment(id: number, dto: CreateCommentDto): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .update(Comment)
      .set({
        text: dto.text,
      })
      .where('id = :id', { id })
      .execute();
  }

  async deleteComment(id: number): Promise<void> {
    await this.delete(id);
  }
}
