import { useMutation, UseMutationOptions } from 'react-query';
import AuthAPI from '../../../api/auth';
import { ISigninRequest } from '../../../interfaces/auth.interface';
import { IUser } from '../../../interfaces/user.interface';

const useLogin = (option?: UseMutationOptions<IUser, any, ISigninRequest>) => {
  return useMutation(AuthAPI.signin, option);
};

export default useLogin;
