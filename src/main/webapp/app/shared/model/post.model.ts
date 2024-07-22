import dayjs from 'dayjs';
import { ICategory } from 'app/shared/model/category.model';
import { IPerson } from 'app/shared/model/person.model';
import { Status } from 'app/shared/model/enumerations/status.model';

export interface IPost {
  id?: number;
  name?: string;
  createdAt?: dayjs.Dayjs | null;
  updateAt?: dayjs.Dayjs | null;
  status?: keyof typeof Status | null;
  view?: number | null;
  category?: ICategory | null;
  person?: IPerson | null;
}

export const defaultValue: Readonly<IPost> = {};
