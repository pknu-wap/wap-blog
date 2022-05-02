export interface IComment {
  id: number;
  body: string;
  author: string;
  createdAt: number;
  updatedAt: number;
}

export interface ICommentRequest {
  author: string;
  body: string;
}
