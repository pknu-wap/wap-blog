import S from './styled';
import { Link } from 'react-router-dom';
import ArticleWriterAndUpdatedAt from '../ArticleWriterAndUpdateAt';
import useGetAllArticle from '../../../hooks/query/article/useGetAllArticles';

const ArticleList = () => {
  const { data } = useGetAllArticle();
  return (
    <>
      <S.ArticleContainer>
        <S.Articles>
          {data?.map((article) => (
            <S.Article key={article.id}>
              <ArticleWriterAndUpdatedAt
                user={article.user}
                updatedAt={article.updatedAt + ''}
              />
              <Link
                key={article.id}
                to={`/@${article.user.username}/${article.id}`}
              >
                <S.ArticleTitle>{article.title}</S.ArticleTitle>
              </Link>
              <S.ArticleDescripton>{article.description}</S.ArticleDescripton>
            </S.Article>
          ))}
        </S.Articles>
      </S.ArticleContainer>
    </>
  );
};
export default ArticleList;
