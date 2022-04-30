import client from '../utils/axios';

const ArticleAPI = {
  getAll: async () => {
    const response = await client.get(`/articles`);
    return response.data;
  },
};

export default ArticleAPI;
