import { useQuery } from 'react-query';
import styled from 'styled-components';
import ArticleAPI from '../../../api/article';
import tw from 'tailwind-styled-components';
import { Link } from 'react-router-dom';
import ArticleWriterAndUpdatedAt from '../ArticleWriterAndUpdateAt';

const ArticleContainer = tw.div`
w-full 
`;

const Articles = tw.ul`
w-1/2
mx-auto
divide-y-2
divide-solid
`;
const Article = styled.li`
  padding: 20px 0;
`;

const ArticleTitleColor = styled.h2`
  color: ${(props) => props.theme.textColor};
`;
const ArticleTitle = tw(ArticleTitleColor)`
text-xl
font-medium
`;
const ArticleDescriptonColor = styled.span`
  color: ${(props) => props.theme.lightTextColor};
`;
const ArticleDescripton = tw(ArticleDescriptonColor)`
text-lg
font-light
`;

const ArticleList = () => {
  const { data: articleListData } = useQuery('articleList', ArticleAPI.getAll);
  return (
    <>
      <ArticleContainer>
        <Articles>
          {articleListData?.map((article) => (
            <Article key={article.id}>
              <ArticleWriterAndUpdatedAt
                user={article.user}
                updatedAt={article.updatedAt + ''}
              />
              <Link
                key={article.id}
                to={`/@${article.user.username}/${article.id}`}
              >
                <ArticleTitle>{article.title}</ArticleTitle>
              </Link>
              <ArticleDescripton>{article.description}</ArticleDescripton>
            </Article>
          ))}
        </Articles>
      </ArticleContainer>
    </>
  );
};
export default ArticleList;
