import dayjs from 'dayjs';
import { IPerson } from 'app/shared/model/person.model';
import { IMessageList } from 'app/shared/model/message-list.model';
import { Status } from 'app/shared/model/enumerations/status.model';

export interface IMessage {
  id?: number;
  content?: string | null;
  createdAt?: dayjs.Dayjs | null;
  status?: keyof typeof Status | null;
  sender?: IPerson | null;
  messagelist?: IMessageList | null;
}

export const defaultValue: Readonly<IMessage> = {};
