import { useMutation, UseMutationOptions } from 'react-query';
import ArticleAPI from '../../../api/article';
import { IArticleRequest } from '../../../interfaces/article.interface';

const useWriteArticle = (
  article: IArticleRequest,
  option?: UseMutationOptions,
) => {
  return useMutation(() => ArticleAPI.create(article), option);
};

export default useWriteArticle;
