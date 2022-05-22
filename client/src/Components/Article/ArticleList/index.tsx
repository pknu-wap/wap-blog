import S from './styled';
import { useQuery } from 'react-query';
import ArticleAPI from '../../../api/article';
import { Link } from 'react-router-dom';
import ArticleWriterAndUpdatedAt from '../ArticleWriterAndUpdateAt';

const ArticleList = () => {
  const { data: articleListData } = useQuery('articleList', ArticleAPI.getAll);
  return (
    <>
      <S.ArticleContainer>
        <S.Articles>
          {articleListData?.map((article) => (
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
