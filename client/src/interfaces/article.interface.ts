import { IAuthor } from './author.interface';

export interface IArticle {
  id: number;
  author: IAuthor;
  title: string;
  description: string;
  body: string;
  createdAt: number;
  updateddAt: number;
  deletedAt: number;
}

export interface IArticleList {
  artilces: IArticle[];
}

export interface IArticleRequest {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  };
}
