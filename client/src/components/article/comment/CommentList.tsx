import { IComment } from '../../../interfaces/comment.interface';
import CommentItem from './CommentItem';

interface CommentListProps {
  comments: IComment[];
}

const CommentList = ({ comments }: CommentListProps) => {
  return (
    <>
      {comments.map(comment => (
        <div key={comment.id}>
          <CommentItem comment={comment} />
        </div>
      ))}
    </>
  );
};

export default CommentList;
