import { useMutation, UseMutationOptions } from 'react-query';
import ArticleAPI from '../../../api/article';
import { IArticleRequest } from '../../../interfaces/article.interface';

const useWriteArticle = (
  option?: UseMutationOptions<void, any, IArticleRequest>,
) => {
  return useMutation(ArticleAPI.create, option);
};

export default useWriteArticle;
