import { EntityRepository, Repository, getConnection } from 'typeorm';
import { Comment } from '@/article/entity';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
    
}