import { useQuery } from 'react-query';
import styled from 'styled-components';
import ArticleAPI from '../api/article';
import tw from 'tailwind-styled-components';
import { Link } from 'react-router-dom';

const ArticleContainer = tw.div`
w-full 
`;

const ArticleList = tw.ul`
w-full
divide-y-2
divide-solid
`;
const Article = styled.li``;

const Articles = () => {
  const { data: articleListData } = useQuery('articleList', ArticleAPI.getAll);
  return (
    <>
      <ArticleContainer>
        <ArticleList>
          {articleListData?.map(article => (
            <Article key={article.id}>
              <Link key={article.id} to={article.id + ''}>
                <div>{article.id}</div>
                <div>{article.title}</div>
                <div>{article.author}</div>
                <div>{article.description}</div>
              </Link>
            </Article>
          ))}
        </ArticleList>
      </ArticleContainer>
    </>
  );
};
export default Articles;
