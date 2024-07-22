import dayjs from 'dayjs';
import { IPost } from 'app/shared/model/post.model';

export interface ICommentList {
  id?: number;
  name?: string;
  createdAt?: dayjs.Dayjs | null;
  post?: IPost | null;
}

export const defaultValue: Readonly<ICommentList> = {};
