import { User } from '@src/app/store/@types/interfaces';

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserWithPassword extends User {
  password: string;
}

export interface UserRegister extends UserCredentials {
  id: string;
  name: string;
}
