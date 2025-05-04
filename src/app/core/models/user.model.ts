import {UserNameModel} from './user-name.model';

export interface UserModel {
  _id: string;
  isActive: boolean;
  balance?: string;
  picture?: string;
  age: number;
  name?: UserNameModel;
  company?: string;
  email?: string;
  address?: string;
  tags: string[];
  favoriteFruit: string;
}
