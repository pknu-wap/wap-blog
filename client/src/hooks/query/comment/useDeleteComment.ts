import { useMutation, UseMutationOptions } from 'react-query';
import CommentAPI from '../../../api/comment';

const useDeleteComment = (commentId: number, option?: UseMutationOptions) => {
  return useMutation(() => CommentAPI.delete(commentId), option);
};

export default useDeleteComment;
