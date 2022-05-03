import { EntityRepository, Repository, getConnection } from 'typeorm';
import { Comment } from '@/article/entity';
import { CommentArticleDto } from '../dto';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment>{

    async cmtbyId(id: number) {
        const cmt = await getConnection()
        .createQueryBuilder()
        .select("comment")
        .from(Comment, "comment")
        .where("articleId = :id", {id: +id})
        .getMany()
        return cmt;
    }

    async upcomment(id: number, dto: CommentArticleDto): Promise<Comment> {
        await getConnection()
          .createQueryBuilder()
          .update(Comment)
          .set({
              comment: dto.comment
          })
          .where('id = :id', { id: id })
          .execute();
        return;
      }
}