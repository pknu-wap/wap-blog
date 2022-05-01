import { Injectable } from '@nestjs/common';
import { UpdateArticleDto, CreateArticleDto } from '@/article/dto/index';
import { ArticleRepository } from '../repository';

@Injectable()
export class ArticleService {
  constructor(private readonly articlerepo: ArticleRepository) {}

  async allarticle() {
    // 넘겨줄 순서, 개수 고려할 수 있음
    const all = await this.articlerepo.find();
    return all;
  }

  async article(id: number) {
    const article = await this.articlerepo.findarticle(id);
    return article;
  }

  async article_Tag(tag: string) {
    return;
  }

  async create(dto: CreateArticleDto) {
    const article = this.articlerepo.create(dto);
    await this.articlerepo.save(article);
    return 'This action adds a new article';
  }

  async update(id: number, dto: UpdateArticleDto) {
    await this.articlerepo.uparticle(id, dto);
    return;
  }

  async remove(id: number) {
    //updatedat 도 같이 갱신된다.
    //삭제된 열 지우는 부분 필요
    await this.articlerepo.softDelete({ id: id });
    return `${id} article을 삭제했습니다.`;
  }

  async restore(id: number) {
    await this.articlerepo.restore(id);
    return;
  }
}
