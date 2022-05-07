import { Suspense } from 'react';
import { useQuery } from 'react-query';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import ArticleAPI from '../api/article';
import ArticleWriterAndUpdatedAt from '../components/article/ArticleWriterAndUpdatedAt';
import LoadingSpinner from '../components/common/LoadingSpinner';
import TagList from '../components/TagList';

const ArticleContainer = tw.div`
w-full 
mt-[100px]
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
  color: ${props => props.theme.textColor};
`;
const ArticleTitle = tw(ArticleTitleColor)`
text-xl
font-medium
`;
const ArticleDescriptonColor = styled.span`
  color: ${props => props.theme.lightTextColor};
`;
const ArticleDescripton = tw(ArticleDescriptonColor)`
text-lg
font-light
`;

const BlogPage = () => {
  const { username } = useParams();
  const [search] = useSearchParams();
  const tag = search.get('tag');
  console.log(tag);

  const { data: articleListData } = useQuery(['articleList', username], () =>
    ArticleAPI.getUserArticleByTag(username!, tag),
  );
  return (
    <>
      <TagList />
      <Suspense fallback={<LoadingSpinner />}>
        <ArticleContainer>
          <Articles>
            {articleListData?.map(article => (
              <Article key={article.id}>
                <Link key={article.id} to={article.id + ''}>
                  <ArticleWriterAndUpdatedAt
                    user={article.user}
                    updatedAt={article.updatedAt + ''}
                  />
                  <ArticleTitle>{article.title}</ArticleTitle>
                  <ArticleDescripton>{article.description}</ArticleDescripton>
                </Link>
              </Article>
            ))}
          </Articles>
        </ArticleContainer>
      </Suspense>
    </>
  );
};

export default BlogPage;
