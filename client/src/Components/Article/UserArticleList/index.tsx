import { Link } from 'react-router-dom';
import S from './styled';
import ArticleWriterAndUpdatedAt from '../ArticleWriterAndUpdateAt';
import useGetUserArticles from '../../../hooks/query/article/useGetUserArticles';

interface UserArticleListProps {
  username: string;
  tag?: string;
}

const UserArticleList = ({ username, tag }: UserArticleListProps) => {
  const { data } = useGetUserArticles(username, tag);
  return (
    <div>
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
    </div>
  );
};

export default UserArticleList;
