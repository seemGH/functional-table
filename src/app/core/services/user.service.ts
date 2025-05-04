import {Injectable} from '@angular/core';
import {delay, Observable, of} from 'rxjs';
import data from '../../../data';

import {QuerySearchParamsModel, UserModel} from '../models';

const MOCK_USERS = data;

@Injectable()
export class UserService {
  retrieve(params: QuerySearchParamsModel): Observable<{ data: UserModel[]; total: number }> {
    const query = params.q?.toLowerCase();
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    const sortBy = params.sortBy as keyof UserModel;
    const sortDirection = params.sortDirection ?? 'asc';

    let filteredData = [...MOCK_USERS] as UserModel[];
    if (query) {
      filteredData = this._applySearchFilter(filteredData, query);
    }

    if (sortBy) {
      filteredData = this._sortData(filteredData, sortBy, sortDirection);
    }

    const start = (page - 1) * limit;
    const paginatedData = filteredData.slice(start, start + limit);
    const randomDelay = Math.floor(Math.random() * 1000) + 500;

    return of({data: paginatedData, total: filteredData.length})
      .pipe(delay(randomDelay));
  }

  private _applySearchFilter(data: UserModel[], query: string): UserModel[] {
    return data.filter(user => {
      const searchableFields = [
        user?.name?.first,
        user?.name?.last,
        user?.email,
        user?.company,
        user?.address
      ];
      return searchableFields.some(field => field?.toLowerCase().includes(query));
    });
  }

  private _sortData(data: UserModel[], sortBy: keyof UserModel, direction: 'asc' | 'desc'): UserModel[] {
    return [...data].sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];

      if (valA === undefined || valB === undefined) {
        return 0;
      }

      if (sortBy === 'name') {
        const nameA = `${a.name?.first || ''} ${a.name?.last || ''}`.trim();
        const nameB = `${b.name?.first || ''} ${b.name?.last || ''}`.trim();

        return direction === 'asc'
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      }

      if (typeof valA === 'string' && typeof valB === 'string') {
        return direction === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      if (typeof valA === 'number' && typeof valB === 'number') {
        return direction === 'asc' ? valA - valB : valB - valA;
      }

      if (typeof valA === 'boolean' && typeof valB === 'boolean') {
        return direction === 'asc'
          ? Number(valA) - Number(valB)
          : Number(valB) - Number(valA);
      }

      return 0;
    });
  }
}
