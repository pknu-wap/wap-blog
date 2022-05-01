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

    async cmtbyId(id: number){
        const cmt = await this.cmtrepo.cmtbyId(id);
        return cmt
    }

    async cmtarticle(dto: CommentArticleDto, id: number) {
        // 관계형은 save 방식이 다르다.
        const article = await this.articlerepo.findOne({id});
        const cmt = new Comment();
        cmt.commentor = dto.commentor;
        cmt.comment = dto.comment;
        cmt.article = article;
        await this.cmtrepo.save(cmt);

        return "success"
    }

    async update(id: number, dto: CommentArticleDto) {
        await this.cmtrepo.upcomment(id, dto);
        return;
      }

    async remove(id: number){
        await this.cmtrepo.delete({ id: id });
        return `success`;
    }
}

// async addComment(slug: string, commentData): Promise<ArticleRO> {
//     let article = await this.articleRepository.findOne({slug});

//     const comment = new Comment();
//     comment.body = commentData.body;

//     article.comments.push(comment);

//     await this.commentRepository.save(comment);
//     article = await this.articleRepository.save(article);
//     return {article}
//   }