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
  return (
    <>
      <ArticleContainer>
        <ArticleList>
          {articleListData?.articles.map(data => (
            <Article key={data.id}>
              <div>{data.id}</div>
              <div>{data.title}</div>
              <div>{data.body}</div>
            </Article>
          ))}
        </ArticleList>
      </ArticleContainer>
    </>
  );
};
export default Articles;
