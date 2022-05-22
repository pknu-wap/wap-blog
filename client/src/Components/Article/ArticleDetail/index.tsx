import { useQuery } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ArticleAPI from '../../../api/article';
import tw from 'tailwind-styled-components';
import styled from 'styled-components';
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
    <ArticleContainer>
      <ArticleHeader>
        <ArticleTitle>{articleDetailData?.title}</ArticleTitle>
        <ArticleHeaderColumn>
          <ArticleWriterAndUpdatedAt
            user={articleDetailData?.user!}
            updatedAt={String(articleDetailData?.updatedAt)}
          />
          {articleDetailData?.user.id === user?.id ? (
            <ArticleDeleteBtn onClick={onDelete}>삭제</ArticleDeleteBtn>
          ) : null}
        </ArticleHeaderColumn>
      </ArticleHeader>
      <ArticleBodyContainer>
        <ArticleTags>
          {tagList?.map((tag) => (
            <Link to={`/@${user?.username}?tag=${tag.substring(1)}`}>
              <ArticleTag key={tag}>{tag}</ArticleTag>
            </Link>
          ))}
        </ArticleTags>
        <ArticleBody>{articleDetailData?.body}</ArticleBody>
        <CommentContainer
          articleId={+articleId!}
          comments={articleDetailData?.comments!}
        />
      </ArticleBodyContainer>
    </ArticleContainer>
  );
};

const ArticleContainer = tw.div`
w-full
flex
flex-col
`;
const ArticleHeaderColor = styled.div`
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bannerColor};
`;
const ArticleHeader = tw(ArticleHeaderColor)`
flex
flex-col
border
border-solid
px-[15%]
pb-5
mt-16
`;

const ArticleHeaderColumn = tw.div`
flex
justify-between
w-full
`;

const ArticleTitle = tw.h1`
mt-20
text-4xl
font-bold
mx-auto
`;

const ArticleTags = tw.ul`
mt-2
flex
gap-2
`;
const ArticleTag = tw.li`
border
border-solid
px-2
py-1
rounded-md
`;
const ArticleBodyContainer = tw.div`
w-[80%]
mx-auto
mt-2
`;
const ArticleBody = tw.p`
mt-3
`;

const ArticleDeleteBtn = tw.button`


`;

export default ArticleDetail;
