import { IUser } from '../interfaces/user.interface';
import client from '../utils/axios';

const UserAPI = {
  getCurrentUser: async (): Promise<IUser | null> => {
    const response = await client.get('/user');
    return response.data;
  },
};

export default UserAPI;
