import { IAuthor } from './author.interface';

export interface IArticle {
  id: number;
  writer: IAuthor;
  tag: string;
  title: string;
  description: string;
  body: string;
  createdAt: number;
  updateddAt: number;
  deletedAt: number;
}

export interface IArticleRequest {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  };
}
