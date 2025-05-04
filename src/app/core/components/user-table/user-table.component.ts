import {ChangeDetectionStrategy, Component, computed, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {BadgeModule} from 'primeng/badge';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {MessageService, SortMeta} from 'primeng/api';
import {MultiSelectModule} from 'primeng/multiselect';
import {Skeleton} from 'primeng/skeleton';
import {Table, TableLazyLoadEvent} from 'primeng/table';
import {TableModule} from 'primeng/table';
import {TagModule} from 'primeng/tag';
import {ToastModule} from 'primeng/toast';
import {Tooltip} from 'primeng/tooltip';

import {FullNamePipe, StatusLabelPipe} from '../../pipes';
import {UserService} from '../../services';

import {Subject, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

import {Column, QuerySearchParamsModel, UserModel} from '../../models';

@Component({
  selector: 'app-user-table',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    MultiSelectModule,
    BadgeModule,
    TagModule,
    DialogModule,
    ButtonModule,
    InputIcon,
    IconField,
    Tooltip,
    FullNamePipe,
    StatusLabelPipe,
    Skeleton,
    DropdownModule,
    ToastModule
  ],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
  providers: [MessageService, UserService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableComponent implements OnInit, OnDestroy {
  filterFields = ['name.first', 'name.last', 'email', 'company', 'isActive', 'balance', 'favoriteFruit'];

  totalRecords = signal<number>(0);
  users = signal<UserModel[]>([]);
  columns = signal<Column[]>([]);
  selectedColumns = signal<Column[]>([]);
  fullScreenTable = signal<boolean>(false);
  loading = signal<boolean>(false);
  sortField = signal<string>('');
  sortOrder = signal<number>(1);
  querySearchParams = signal<QuerySearchParamsModel>({
    page: 1,
    limit: 10,
    q: '',
  });

  searchSubject$ = new Subject<string>();

  private _userService = inject(UserService);
  private _messageService = inject(MessageService);
  private _searchSubscription?: Subscription;
  private _dataSubscription?: Subscription;

  ngOnInit(): void {
    this.columns.set([
      {field: 'name', header: 'Name', visible: true},
      {field: 'email', header: 'Email', visible: true},
      {field: 'company', header: 'Company', visible: true},
      {field: 'address', header: 'Address', visible: true},
      {field: 'balance', header: 'Balance', visible: true},
      {field: 'favoriteFruit', header: 'Favorite Fruit', visible: true},
      {field: 'tags', header: 'Tags', visible: true},
      {field: 'isActive', header: 'Status', visible: true}
    ]);

    this.selectedColumns.set([...this.columns()]);

    this._searchSubscription = this.searchSubject$
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(searchTerm => {
        this.querySearchParams.update(params => ({
          ...params,
          q: searchTerm,
          page: 1
        }));
        this._loadData();
      });

    this._loadData();
  }

  ngOnDestroy(): void {
    this._searchSubscription?.unsubscribe();
    this._dataSubscription?.unsubscribe();
  }

  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.searchSubject$.next(searchTerm);
  }

  onSort(event: SortMeta): void {
    const sortField = event.field;
    const sortOrder = event.order;

    this.sortField.set(sortField);
    this.sortOrder.set(sortOrder);

    this.querySearchParams.update(params => ({
      ...params,
      sortBy: sortField as keyof UserModel,
      sortDirection: sortOrder === 1 ? 'asc' : 'desc'
    }));

    this._loadData();
  }

  onPage(event: TableLazyLoadEvent): void {
    const first = event.first ?? 0;
    const rows = event.rows ?? 10;

    const page = Math.floor(first / rows) + 1;

    this.querySearchParams.update(params => ({
      ...params,
      page: page,
      limit: rows
    }));

    this._loadData();
  }

  onClear(table: Table): void {
    this.selectedColumns.set([...this.columns()]);
    table.clear();

    this.querySearchParams.set({
      page: 1,
      limit: this.querySearchParams().limit,
      q: '',
    });

    this.sortField.set('');
    this.sortOrder.set(1);
    this.searchSubject$.next('');

    this._loadData();
  }

  getSkeletonWidth(field: string): string {
    switch (field) {
      case 'name':
        return '10rem';
      case 'company':
        return '8rem';
      case 'email':
        return '15rem';
      case 'address':
        return '15rem';
      case 'isActive':
        return '5rem';
      case 'tags':
        return '14rem';
      case 'balance':
        return '6rem';
      case 'favoriteFruit':
        return '7rem';
      default:
        return '8rem';
    }
  }

  private _loadData(): void {
    this.loading.set(true);
    this._dataSubscription?.unsubscribe();
    this._dataSubscription = this._userService.retrieve(this.querySearchParams())
      .subscribe({
        next: (response) => {
          this.users.set(response.data);
          this.totalRecords.set(response.total);
          this.loading.set(false);
        },
        error: (error) => {
          this.loading.set(false);
          this._messageService.add({
            severity: 'error',
            summary: 'Error Loading Data',
            detail: error.message || 'Failed to load user data. Please try again later.',
            life: 5000
          });
        }
      });
  }
}
