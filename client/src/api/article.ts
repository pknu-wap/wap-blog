import { IArticle, IArticleRequest } from '../interfaces/article.interface';
import client from '../utils/axios';

const ArticleAPI = {
  getAll: async (): Promise<IArticle[]> => {
    const response = await client.get(`/article`);
    return response.data;
  },
  getById: async (id: number): Promise<IArticle> => {
    const response = await client.get(`/article/${id}`);
    return response.data;
  },
  getUserArticleByTag: async (
    username: string,
    tag?: string,
  ): Promise<IArticle[]> => {
    const response = await client.get(`/article/user/${username}`, {
      params: { tag },
    });
    return response.data;
  },
  create: async (article: IArticleRequest): Promise<void> => {
    await client.post(`/article`, article);
  },
  delete: async (id: number): Promise<void> => {
    await client.delete(`/article/${id}`);
  },
  update: async (id: number, article: IArticleRequest): Promise<IArticle> => {
    const response = await client.put(`/article/${id}`, article);
    return response.data;
  },
};

export default ArticleAPI;
