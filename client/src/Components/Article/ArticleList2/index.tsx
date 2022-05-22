import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import S from './styled';
import ArticleAPI from '../../../api/article';
import ArticleWriterAndUpdatedAt from '../ArticleWriterAndUpdateAt';

interface ArticleList2Props {
  username: string;
  tag?: string;
}

const ArticleList2 = ({ username, tag }: ArticleList2Props) => {
  const { data: articleListData } = useQuery(
    ['articleList', username, tag],
    () => ArticleAPI.getUserArticleByTag(username!, tag!),
  );
  return (
    <div>
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
    </div>
  );
};

export default ArticleList2;
