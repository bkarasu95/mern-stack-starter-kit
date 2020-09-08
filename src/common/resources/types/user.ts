// useful for client side
export interface IUser {
  name: string;
  surname: string;
  email: string;
  created_at?: Date;
  deleted_at?: Date;
}

export interface IAdminUser {
  name: string;
  username: string;
  password: string;
  status: boolean;
  avatar?: string;
}
