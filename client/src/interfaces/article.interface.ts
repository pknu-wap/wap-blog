export interface IArticle {
  id: number;
  writer: string;
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
