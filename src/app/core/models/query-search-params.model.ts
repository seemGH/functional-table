import {UserModel} from './user.model';

export interface QuerySearchParamsModel {
  q?: string;
  sortBy?: keyof UserModel;
  sortDirection?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}
