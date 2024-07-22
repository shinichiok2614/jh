import dayjs from 'dayjs';
import { IPerson } from 'app/shared/model/person.model';
import { ICommentList } from 'app/shared/model/comment-list.model';

export interface IComment {
  id?: number;
  description?: string | null;
  createdAt?: dayjs.Dayjs | null;
  updateAt?: dayjs.Dayjs | null;
  person?: IPerson | null;
  commentlist?: ICommentList | null;
}

export const defaultValue: Readonly<IComment> = {};
