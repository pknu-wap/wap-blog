import { useQuery } from 'react-query';
import UserAPI from '../../../api/user';
import { QUERY_KEYS } from '../../../config/queryKeys';

const useGetCurrentUser = () => {
  return useQuery([QUERY_KEYS.USER], UserAPI.getCurrentUser);
};

export default useGetCurrentUser;
