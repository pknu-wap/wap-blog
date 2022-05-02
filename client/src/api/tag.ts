import { ITag } from '../interfaces/tag.interface';
import client from '../utils/axios';

const TagAPI = {
  getAll: async (): Promise<ITag[]> => {
    const response = await client.get('/tag');
    return response.data;
  },
};
export default TagAPI;
