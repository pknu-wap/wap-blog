import client from '../utils/axios';

const UserAPI = {
  getCurrentUser: async () => {
    const response = await client.get('/user');
    return response.data;
  },
};

export default UserAPI;
