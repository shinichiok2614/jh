import dayjs from 'dayjs';
import { IPost } from 'app/shared/model/post.model';

export interface IParagraph {
  id?: number;
  name?: string;
  description?: string | null;
  order?: number;
  createdAt?: dayjs.Dayjs | null;
  updateAt?: dayjs.Dayjs | null;
  post?: IPost | null;
}

export const defaultValue: Readonly<IParagraph> = {};
