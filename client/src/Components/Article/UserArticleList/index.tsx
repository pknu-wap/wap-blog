import { Link } from 'react-router-dom';
import S from './styled';
import ArticleWriterAndUpdatedAt from '../ArticleWriterAndUpdateAt';
import useGetUserArticles from '../../../hooks/query/article/useGetUserArticles';
import ArticleComponent from '../ArticleComponent';

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
              <ArticleComponent article={article} />
            </S.Article>
          ))}
        </S.Articles>
      </S.ArticleContainer>
    </div>
  );
};

export default UserArticleList;
