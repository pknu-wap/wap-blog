import { useQuery } from 'react-query';
import styled from 'styled-components';
import ArticleAPI from '../api/article';

const ArticleContainer = styled.div``;
const ArticleList = styled.li``;
const Article = styled.ul``;

const Articles = () => {
  const { data: articleListData } = useQuery('articleList', ArticleAPI.getAll, {
    suspense: true,
  });
  console.log(articleListData);
  return (
    <>
      <ArticleContainer>
        <ArticleList>
          {articleListData?.articles?.map(data => (
            <Article key={data?.id}>{data?.id}</Article>
          ))}
        </ArticleList>
      </ArticleContainer>
    </>
  );
};
export default Articles;
