import { IComment, ICommentRequest } from '../interfaces/comment.interface';
import client from '../utils/axios';

const CommentAPI = {
  forArticle: async (articleId: number): Promise<IComment[]> => {
    const response = await client.get(`/article/${articleId}/comment`);
    return response.data;
  },
  create: async (
    articleId: number,
    comment: ICommentRequest,
  ): Promise<void> => {
    await client.post(`/comment/${articleId}`, comment);
  },
  delete: async (commentId: number): Promise<void> => {
    await client.delete(`/comment/${commentId}`);
  },
  update: async (commentId: number, comment: string): Promise<void> => {
    await client.patch(`/comment/${commentId}`, {
      text: comment,
    });
  },
};
export default CommentAPI;
