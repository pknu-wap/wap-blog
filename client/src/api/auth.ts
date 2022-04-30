import { ISigninRequest, ISignupRequest } from '../interfaces/auth.interface';
import client from '../utils/axios';

const AuthAPI = {
  signin: async (body: ISigninRequest): Promise<void> => {
    await client.post(`/auth/signin/local`, body);
  },
  signup: async (body: ISignupRequest): Promise<void> => {
    await client.post(`/auth/signup/local`, body);
  },
  logout: async (): Promise<void> => {
    await client.delete(`/auth`);
  },
};
export default AuthAPI;
