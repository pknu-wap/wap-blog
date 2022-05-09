import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import { IUser } from '../../interfaces/user.interface';

const ArticleWriterAndUpdatedAtContainer = tw.div`
flex
flex-col
`;
const ArticleWriterColor = styled.span`
  color: ${props => props.theme.textColor};
`;
const ArticleWriter = tw(ArticleWriterColor)`
text-base
font-semibold
`;
const ArticleUpdatedAtColor = styled.span`
  color: ${props => props.theme.lightTextColor};
`;
const ArticleUpdatedAt = tw(ArticleUpdatedAtColor)`
text-xs
`;
interface IWriterAndUpdatedAt {
  user: IUser;
  updatedAt: string;
}

const ArticleWriterAndUpdatedAt = ({
  user,
  updatedAt,
}: IWriterAndUpdatedAt) => {
  const [articleUpdatedAt, setArticleUpdatedAt] = useState<string>();

  useEffect(() => {
    const date =
      new Date(updatedAt!).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }) +
      ' ' +
      new Date(updatedAt!).toLocaleDateString('ko-KR', {
        weekday: 'long',
      });
    setArticleUpdatedAt(date); //날짜 한글로 변환
  }, [updatedAt]);
  return (
    <>
      <ArticleWriterAndUpdatedAtContainer>
        <ArticleWriter>
          <Link to={`/@${user.username}`}>{user.username}</Link>
        </ArticleWriter>
        <ArticleUpdatedAt>{articleUpdatedAt}</ArticleUpdatedAt>
      </ArticleWriterAndUpdatedAtContainer>
    </>
  );
};
export default ArticleWriterAndUpdatedAt;
