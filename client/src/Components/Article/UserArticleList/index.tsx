import S from './styled';
import ArticleComponent from '../ArticleComponent';
import { UseInfiniteQueryOptions, useInfiniteQuery } from 'react-query';
import { QUERY_KEYS } from '../../../config/queryKeys';
import useIntersectionObserver from '../../../hooks/common/useIntersectionObserver';
import { ArticleListType } from '../../../interfaces/article.interface';
import client from '../../../utils/axios';
import LoadingSpinner from '../../Common/LoadingSpinner';

interface UserArticleListProps {
  username: string;
  tag?: string;
}

const UserArticleList = ({ username, tag }: UserArticleListProps) => {
  interface CustomQueryOption extends UseInfiniteQueryOptions<ArticleListType> {
    username: string;
    tag?: string;
    cursor?: number;
  }

  const getUserArticleByTag = async ({
    username,
    tag,
    cursor,
  }: CustomQueryOption): Promise<ArticleListType> => {
    const response = await client.get(`/article/user/${username}`, {
      params: { tag, cursor },
    });
    return response.data;
  };

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    [QUERY_KEYS.ARTICLE, username, tag],
    ({ pageParam }) =>
      getUserArticleByTag({ username, tag, cursor: pageParam }),
    {
      getNextPageParam: (lastPage) =>
        //getNextPageParam이 undefined일 경우 hasNextPage가 false 됨
        lastPage.length > 0 ? lastPage[lastPage.length - 1].id : undefined,
      suspense: false,
    },
  );

  const loadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  const targetElement = useIntersectionObserver({ onIntersect: loadMore });

  return (
    <>
      <S.ArticleContainer>
        <S.Articles>
          {data?.pages.map((page) =>
            page.map((article) => (
              <S.Article key={article.id}>
                <ArticleComponent article={article} />
              </S.Article>
            )),
          )}
        </S.Articles>
        {isFetching && <LoadingSpinner />}
        <S.InfiniteScrollTarget ref={targetElement} />
      </S.ArticleContainer>
    </>
  );
};

export default UserArticleList;
