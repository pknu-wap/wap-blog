import { useState } from 'react';
import { IComment } from '../../../interfaces/comment.interface';
import CommentItem from '../CommentItem';
import UpdateComment from '../CommentItem/update';

interface CommentListProps {
  comments?: IComment[];
  articleId: number;
}

const CommentList = ({ comments, articleId }: CommentListProps) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [clickedComment, setClickedComment] = useState<number>();
  return (
    <>
      {comments?.map((comment) => (
        <div key={comment.id}>
          {isUpdate && comment.id === clickedComment ? (
            <UpdateComment
              setIsUpdate={setIsUpdate}
              comment={comment}
              articleId={articleId}
            />
          ) : (
            <CommentItem
              comment={comment}
              articleId={articleId}
              setIsUpdate={setIsUpdate}
              setClickedComment={setClickedComment}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default CommentList;
