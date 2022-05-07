import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import ArticleAPI from '../../api/article';
import tw from 'tailwind-styled-components';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ArticleWriterAndUpdatedAt from './ArticleWriterAndUpdatedAt';
import { useStore } from '../../store/store';

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
overflow-y-scroll
h-screen
`;
const ArticleBody = tw.p``;

const ArticleDeleteBtn = styled.button``;

const ArticleDetail = () => {
  const { user } = useStore();
  const { articleId } = useParams();
  const [tagList, setTagList] = useState<string[]>();
  const { data: articleDetailData } = useQuery(
    ['article', `${articleId}`],
    () => ArticleAPI.getById(+articleId!),
  );
  const navigate = useNavigate();

  useEffect(() => {
    setTagList(
      articleDetailData?.tagList.map(tag =>
        tag.name.trim().charAt(0) === '#'
          ? tag.name.trim()
          : `#${tag.name.trim()}`,
      ),
    ); //태그 배열에 넣음
  }, [articleDetailData?.tagList]);
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
          updatedAt={articleDetailData?.updatedAt + ''}
        />
      </ArticleHeader>
      <ArticleTags>
        {tagList?.map(tag => (
          <ArticleTag key={tag}>{tag}</ArticleTag>
        ))}
      </ArticleTags>
      <ArticleBodyContainer>
        <ArticleBody>{articleDetailData?.body}</ArticleBody>
      </ArticleBodyContainer>
    </ArticleContainer>
  );
};

export default ArticleDetail;
