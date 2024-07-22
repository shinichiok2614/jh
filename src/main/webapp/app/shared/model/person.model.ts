import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { IDepartment } from 'app/shared/model/department.model';

export interface IPerson {
  id?: number;
  name?: string;
  phone?: string | null;
  address?: string | null;
  createdAt?: dayjs.Dayjs | null;
  updateAt?: dayjs.Dayjs | null;
  dateOfBirth?: dayjs.Dayjs | null;
  user?: IUser | null;
  department?: IDepartment | null;
}

export const defaultValue: Readonly<IPerson> = {};
