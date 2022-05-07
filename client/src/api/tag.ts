import { ITag } from '../interfaces/tag.interface';
import client from '../utils/axios';

const TagAPI = {
  getAll: async (): Promise<ITag[]> => {
    const response = await client.get('/tag');
    return response.data;
  },
  getUserTags: async (username: string) => {
    const response = await client.get(`/tag/${username}`);
    return response.data;
  },
};
export default TagAPI;
