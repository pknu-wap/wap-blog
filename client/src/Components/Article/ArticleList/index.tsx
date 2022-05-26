import S from './styled';
import { Link } from 'react-router-dom';
import ArticleWriterAndUpdatedAt from '../ArticleWriterAndUpdateAt';
import useGetAllArticle from '../../../hooks/query/article/useGetAllArticles';
import ArticleComponent from '../ArticleComponent';

const ArticleList = () => {
  const { data } = useGetAllArticle();
  return (
    <>
      <S.ArticleContainer>
        <S.Articles>
          {data?.map((article) => (
            <S.Article key={article.id}>
              <ArticleComponent article={article} />
            </S.Article>
          ))}
        </S.Articles>
      </S.ArticleContainer>
    </>
  );
};
export default ArticleList;
