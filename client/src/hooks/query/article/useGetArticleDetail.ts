import { useQuery } from 'react-query';
import ArticleAPI from '../../../api/article';
import { QUERY_KEYS } from '../../../config/queryKeys';

const useGetArticleDetail = (articleId: number) => {
  return useQuery([QUERY_KEYS.ARTICLE, articleId], () =>
    ArticleAPI.getById(articleId),
  );
};

export default useGetArticleDetail;
