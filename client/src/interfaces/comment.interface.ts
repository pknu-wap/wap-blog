export interface IComment {
  id: number;
  body: string;
  createdAt: number;
  updatedAt: number;
}

export interface ICommentList {
  comments: Comment[];
}
