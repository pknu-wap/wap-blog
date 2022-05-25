import { useMutation, UseMutationOptions } from 'react-query';
import ArticleAPI from '../../../api/article';

const useWriteArticle = (option?: UseMutationOptions<void, any, FormData>) => {
  return useMutation(ArticleAPI.create, option);
};

export default useWriteArticle;
