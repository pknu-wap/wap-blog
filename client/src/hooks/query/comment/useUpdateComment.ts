import { useMutation, UseMutationOptions } from 'react-query';
import CommentAPI from '../../../api/comment';

const useUpdateComment = (
  commentId: number,
  comment: string,
  option?: UseMutationOptions,
) => useMutation(() => CommentAPI.update(commentId, comment), option);
export default useUpdateComment;
