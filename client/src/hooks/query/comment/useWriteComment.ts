import { useMutation, UseMutationOptions } from 'react-query';
import CommentAPI from '../../../api/comment';
import { ICommentRequest } from '../../../interfaces/comment.interface';

const useWriteComment = (
  articleId: number,
  comment: ICommentRequest,
  option?: UseMutationOptions,
) => {
  return useMutation(() => CommentAPI.create(articleId, comment), option);
};

export default useWriteComment;
