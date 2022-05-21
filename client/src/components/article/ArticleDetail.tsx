import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import ArticleAPI from '../../api/article';
import tw from 'tailwind-styled-components';
import styled from 'styled-components';
import ArticleWriterAndUpdatedAt from './ArticleWriterAndUpdatedAt';
import { useStore } from '../../store/store';
import CommentContainer from './comment/CommentContainer';
import useTag from '../../hooks/useTag';

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
        {articleDetailData?.user.id === user?.id ? (
          <ArticleDeleteBtn onClick={onDelete}>삭제</ArticleDeleteBtn>
        ) : null}
        <ArticleWriterAndUpdatedAt
          user={articleDetailData?.user!}
          updatedAt={String(articleDetailData?.updatedAt)}
        />
      </ArticleHeader>
      <ArticleBodyContainer>
        <ArticleBody>{articleDetailData?.body}</ArticleBody>
        <ArticleTags>
          {tagList?.map(tag => (
            <ArticleTag key={tag}>{tag}</ArticleTag>
          ))}
        </ArticleTags>
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
  color: ${props => props.theme.textColor};
  background-color: ${props => props.theme.bannerColor};
`;
const ArticleHeader = tw(ArticleHeaderColor)`
flex
flex-col
border
border-solid
px-[15%]
pb-5
`;
const ArticleTitle = tw.h1`
mt-20
text-4xl
font-bold
mx-auto
`;

const ArticleTags = tw.ul``;
const ArticleTag = tw.li``;
const ArticleBodyContainer = tw.div`
w-[80%]
mx-auto
`;
const ArticleBody = tw.p``;

const ArticleDeleteBtn = styled.button``;

export default ArticleDetail;
