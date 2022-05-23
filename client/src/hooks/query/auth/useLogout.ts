import { useMutation, UseMutationOptions } from 'react-query';
import AuthAPI from '../../../api/auth';

const useLogout = (option?: UseMutationOptions) => {
  return useMutation(AuthAPI.logout, option);
};

export default useLogout;
