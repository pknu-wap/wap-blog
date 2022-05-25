import { HttpException, Injectable } from '@nestjs/common';
import { TagRepository } from '@/article/repository/tag.repository';
import { Article, Tag } from '@/article/entity';
import { ArticleRepository } from '../repository';
import { UserRepository } from '@/user/repository';

@Injectable()
export class TagService {
  constructor(
    private readonly tagRepostory: TagRepository,
    private readonly articleRepository: ArticleRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async getAllTags(): Promise<Tag[]> {
    return await this.tagRepostory.findAllTags();
  }

  async getUserTags(username: string) {
    const user = await this.userRepository.findByName(username);
    if (!user) throw new HttpException('존재하지 않는 user입니다', 401);
    const allCount = await this.articleRepository.count({
      fk_user_id: user.id,
    });
    const tagList = await this.tagRepostory.findUserTags(user.id);
    return { tagList, allCount };
  }

  async addTagList(article: Article, tagList: string[]) {
    const tagListData = await Promise.all(
      tagList.map(tag => {
        return this.tagRepostory.findOrCreate(tag);
      }),
    );
    article.tagList = tagListData;
    this.articleRepository.save(article);
  }
}
