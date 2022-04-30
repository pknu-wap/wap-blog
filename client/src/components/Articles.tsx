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
  const { data: articleListData } = useQuery('articleList', ArticleAPI.getAll, {
    suspense: true,
  });
  return (
    <>
      <ArticleContainer>
        <ArticleList>
          {articleListData?.articles.map(data => (
            <Article key={data.id}>
              <Link key={data.id} to={data.id + ''}>
                <div>{data.title}</div>
              </Link>
            </Article>
          ))}
        </ArticleList>
      </ArticleContainer>
    </>
  );
};
export default Articles;
