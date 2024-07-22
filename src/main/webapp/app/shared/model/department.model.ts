export interface IDepartment {
  id?: number;
  name?: string;
  thumbnail?: string | null;
}

export const defaultValue: Readonly<IDepartment> = {};
