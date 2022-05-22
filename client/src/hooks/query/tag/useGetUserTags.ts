import { useQuery } from 'react-query';
import TagAPI from '../../../api/tag';
import { QUERY_KEYS } from '../../../config/queryKeys';

const useGetUserTags = (username: string) => {
  return useQuery([QUERY_KEYS.TAG, username], () =>
    TagAPI.getUserTags(username),
  );
};

export default useGetUserTags;
