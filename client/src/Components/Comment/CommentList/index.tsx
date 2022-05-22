import { IComment } from '../../../interfaces/comment.interface';
import CommentItem from '../CommentItem';

interface CommentListProps {
  comments: IComment[];
  articleId: number;
}

const CommentList = ({ comments, articleId }: CommentListProps) => {
  return (
    <>
      {comments.map((comment) => (
        <div key={comment.id}>
          <CommentItem comment={comment} articleId={articleId} />
        </div>
      ))}
    </>
  );
};

export default CommentList;
