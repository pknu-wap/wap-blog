import styled from 'styled-components';
import { IComment } from '../../../interfaces/comment.interface';
import { useStore } from '../../../store/store';
import CommentInput from '../CommentInput';
import CommentList from '../CommentList';

interface CommentContainerProps {
  articleId: number;
  comments: IComment[];
}

const CommentContainer = ({ articleId, comments }: CommentContainerProps) => {
  const { user } = useStore();
  return (
    <CommentContainerBlock>
      {user && <CommentInput articleId={articleId} />}
      <CommentList comments={comments} articleId={articleId} />
    </CommentContainerBlock>
  );
};

const CommentContainerBlock = styled.div`
  margin-top: 2rem;
`;

export default CommentContainer;
