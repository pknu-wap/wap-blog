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
