import { IArticle } from '../interfaces/article.interface';
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
  create: async (formData: FormData): Promise<void> => {
    await client.post(`/article`, formData);
  },
  delete: async (id: number): Promise<void> => {
    await client.delete(`/article/${id}`);
  },
  update: async (id: number, formData: FormData): Promise<IArticle> => {
    const response = await client.put(`/article/${id}`, formData);
    return response.data;
  },
};

export default ArticleAPI;
