import { Injectable } from '@nestjs/common';
import { UpdateArticleDto, CreateArticleDto, CommentArticleDto } from '@/article/dto/index';
import { CommentRepository, ArticleRepository } from '../repository';
import { Comment, Article } from '../entity'

@Injectable()
export class CommentService {
    constructor(
        private readonly cmtrepo: CommentRepository,
        private readonly articlerepo: ArticleRepository
        ) {}

    async cmtarticle(dto: CommentArticleDto) {
        // 관계형은 save 방식이 다르다.
        // const cmt = new Comment();
        // cmt.commentor = dto.commentor;
        // cmt.comment = dto.comment;
        // await this.cmtrepo.save(cmt);

        // const article = new Article();
        // article.comments = [cmt];
        // await this.articlerepo.save(article)
        return 'cmt saved'
    }
}