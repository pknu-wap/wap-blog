import S from './styled';
import { IComment } from '../../../interfaces/comment.interface';
import { useStore } from '../../../store/store';
import CommentInput from '../CommentInput';
import CommentList from '../CommentList';

interface CommentContainerProps {
  articleId: number;
  comments?: IComment[];
}

const CommentContainer = ({ articleId, comments }: CommentContainerProps) => {
  const { user } = useStore();
  return (
    <S.CommentContainerBlock>
      {user && <CommentInput articleId={articleId} />}
      <CommentList comments={comments} articleId={articleId} />
    </S.CommentContainerBlock>
  );
};

export default CommentContainer;
