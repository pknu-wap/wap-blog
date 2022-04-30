import {
  IComment,
  ICommentList,
  ICommentRequest,
} from '../interfaces/comment.interface';
import client from '../utils/axios';

const CommentAPI = {
  forArticle: async (articleId: number): Promise<ICommentList> => {
    const response = await client.get(`/article/${articleId}/comment`);
    return response.data;
  },
  create: async (
    articleId: number,
    comment: ICommentRequest,
  ): Promise<IComment> => {
    const response = await client.post(
      `/article/${articleId}/comment`,
      comment,
    );
    return response.data;
  },
  delete: async (articleId: number, commentId: number): Promise<void> => {
    await client.delete(`/article/${articleId}/comment/${commentId}`);
  },
};
export default CommentAPI;
