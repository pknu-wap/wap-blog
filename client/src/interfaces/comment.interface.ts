import { IUser } from './user.interface';

export interface IComment {
  id: number;
  body: string;
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICommentRequest {
  body: string;
}
