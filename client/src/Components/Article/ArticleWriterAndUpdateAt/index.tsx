import { Link } from 'react-router-dom';
import S from './styled';
import useDate from '../../../hooks/common/useDate';
import { IUser } from '../../../interfaces/user.interface';

interface IWriterAndUpdatedAt {
  user: IUser;
  updatedAt: string;
}

const ArticleWriterAndUpdatedAt = ({
  user,
  updatedAt,
}: IWriterAndUpdatedAt) => {
  const articleUpdatedAt = useDate(updatedAt);
  return (
    <>
      <S.ArticleWriterAndUpdatedAtContainer>
        <S.ArticleWriter>
          <Link to={`/@${user.username}`}>{user.username}</Link>
        </S.ArticleWriter>
        <S.ArticleUpdatedAt>{articleUpdatedAt}</S.ArticleUpdatedAt>
      </S.ArticleWriterAndUpdatedAtContainer>
    </>
  );
};
export default ArticleWriterAndUpdatedAt;
