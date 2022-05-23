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
  return (
    <>
      {comments?.map((comment) => (
        <div key={comment.id}>
          {isUpdate ? (
            <UpdateComment setIsUpdate={setIsUpdate} comment={comment} />
          ) : (
            <CommentItem
              comment={comment}
              articleId={articleId}
              setIsUpdate={setIsUpdate}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default CommentList;
