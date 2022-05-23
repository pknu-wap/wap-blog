import { Link, useNavigate, useParams } from 'react-router-dom';
import S from './styled';
import ArticleWriterAndUpdatedAt from '../ArticleWriterAndUpdateAt';
import { useStore } from '../../../store/store';
import CommentContainer from '../../Comment/CommentContainer';
import useTag from '../../../hooks/common/useTag';
import useGetArticleDetail from '../../../hooks/query/article/useGetArticleDetail';
import useDeleteArticle from '../../../hooks/query/article/useDeleteArticle';

const ArticleDetail = () => {
  const { user } = useStore();
  const params = useParams<{ articleId: string }>();
  const articleId = Number(params.articleId);
  const navigate = useNavigate();
  const { data } = useGetArticleDetail(articleId);

  const tagList = useTag(data?.tagList);

  const mutation = useDeleteArticle(articleId, {
    onSuccess: () => {
      navigate('/');
    },
  });

  const deleteArticle = () => {
    mutation.mutate();
  };

  return (
    <S.ArticleContainer>
      <S.ArticleHeader>
        <S.ArticleTitle>{data?.title}</S.ArticleTitle>
        <S.ArticleHeaderColumn>
          <ArticleWriterAndUpdatedAt
            user={data?.user!}
            updatedAt={String(data?.updatedAt)}
          />
          {data?.user.id === user?.id ? (
            <S.ArticleDeleteBtn onClick={deleteArticle}>
              삭제
            </S.ArticleDeleteBtn>
          ) : null}
        </S.ArticleHeaderColumn>
      </S.ArticleHeader>
      <S.ArticleBodyContainer>
        <S.ArticleTags>
          {tagList?.map((tag) => (
            <Link to={`/@${user?.username}?tag=${tag.substring(1)}`}>
              <S.ArticleTag key={tag}>{tag}</S.ArticleTag>
            </Link>
          ))}
        </S.ArticleTags>
        <S.ArticleBody>{data?.body}</S.ArticleBody>
        <CommentContainer articleId={+articleId!} comments={data?.comments} />
      </S.ArticleBodyContainer>
    </S.ArticleContainer>
  );
};

export default ArticleDetail;
