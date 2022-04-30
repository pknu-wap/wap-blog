import { ITagList } from '../interfaces/tag.interface';
import client from '../utils/axios';

const TagAPI = {
  getAll: async (): Promise<ITagList> => {
    const response = await client.get('/tag');
    return response.data;
  },
};
export default TagAPI;
