import dayjs from 'dayjs';
import { IPerson } from 'app/shared/model/person.model';
import { IAlbum } from 'app/shared/model/album.model';
import { IParagraph } from 'app/shared/model/paragraph.model';

export interface IImage {
  id?: number;
  name?: string;
  imageContentType?: string;
  image?: string;
  height?: number | null;
  width?: number | null;
  taken?: dayjs.Dayjs | null;
  uploaded?: dayjs.Dayjs | null;
  person?: IPerson | null;
  album?: IAlbum | null;
  paragraph?: IParagraph | null;
}

export const defaultValue: Readonly<IImage> = {};
