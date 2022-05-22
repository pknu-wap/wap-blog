import { useQuery } from 'react-query';
import ArticleAPI from '../../../api/article';
import { QUERY_KEYS } from '../../../config/queryKeys';

const useGetUserArticles = (username: string, tag?: string) => {
  return useQuery([QUERY_KEYS.ARTICLE, username, tag], () =>
    ArticleAPI.getUserArticleByTag(username, tag),
  );
};

export default useGetUserArticles;
