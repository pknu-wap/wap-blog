import { IArticleImage } from './article-image.interface';
import { IComment } from './comment.interface';
import { ITag } from './tag.interface';
import { IUser } from './user.interface';

export interface IArticle {
  id: number;
  user: IUser;
  title: string;
  description: string;
  body: string;
  images: IArticleImage[];
  comments: IComment[];
  tagList: ITag[];
  createdAt: Date;
  updatedAt: Date;
}

// 이거는 IArticle에다가 comments_count를 넣고 Omit을 이용해서 comments 부분을 제거한 것
export type ArticleListType = Omit<
  IArticle & { comments_count: number },
  'comments'
>[];
