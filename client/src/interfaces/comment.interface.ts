import { IUser } from './user.interface';

export interface IComment {
  id: number;
  text: string;
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICommentRequest {
  text: string;
}
