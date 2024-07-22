import dayjs from 'dayjs';
import { IPerson } from 'app/shared/model/person.model';

export interface IMessageList {
  id?: number;
  name?: string | null;
  createdAt?: dayjs.Dayjs | null;
  author?: IPerson | null;
  receiver?: IPerson | null;
}

export const defaultValue: Readonly<IMessageList> = {};
