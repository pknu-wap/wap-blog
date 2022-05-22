import { useMutation, UseMutationOptions } from 'react-query';
import ArticleAPI from '../../../api/article';

const useDeleteArticle = (articleId: number, option?: UseMutationOptions) => {
  return useMutation(() => ArticleAPI.delete(articleId), option);
};

export default useDeleteArticle;
