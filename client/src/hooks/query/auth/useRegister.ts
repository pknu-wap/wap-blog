import { useMutation, UseMutationOptions } from 'react-query';
import AuthAPI from '../../../api/auth';
import { ISignupRequest } from '../../../interfaces/auth.interface';

const useRegister = (
  option?: UseMutationOptions<void, any, ISignupRequest>,
) => {
  return useMutation(AuthAPI.signup, option);
};

export default useRegister;
