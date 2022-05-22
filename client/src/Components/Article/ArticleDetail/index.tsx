import { useQuery } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ArticleAPI from '../../../api/article';
import S from './styled';
import ArticleWriterAndUpdatedAt from '../ArticleWriterAndUpdateAt';
import { useStore } from '../../../store/store';
import CommentContainer from '../../Comment/CommentContainer';
import useTag from '../../../hooks/common/useTag';

const ArticleDetail = () => {
  const { user } = useStore();
  const { articleId } = useParams();
  const navigate = useNavigate();
  const { data: articleDetailData } = useQuery(
    ['article', `${articleId}`],
    () => ArticleAPI.getById(+articleId!),
  );
  const tagList = useTag(articleDetailData?.tagList!);

  const onDelete = async () => {
    await ArticleAPI.delete(+articleId!);
    navigate('/');
  };

  return (
    <S.ArticleContainer>
      <S.ArticleHeader>
        <S.ArticleTitle>{articleDetailData?.title}</S.ArticleTitle>
        <S.ArticleHeaderColumn>
          <ArticleWriterAndUpdatedAt
            user={articleDetailData?.user!}
            updatedAt={String(articleDetailData?.updatedAt)}
          />
          {articleDetailData?.user.id === user?.id ? (
            <S.ArticleDeleteBtn onClick={onDelete}>삭제</S.ArticleDeleteBtn>
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
        <S.ArticleBody>{articleDetailData?.body}</S.ArticleBody>
        <CommentContainer
          articleId={+articleId!}
          comments={articleDetailData?.comments!}
        />
      </S.ArticleBodyContainer>
    </S.ArticleContainer>
  );
};

export default ArticleDetail;
