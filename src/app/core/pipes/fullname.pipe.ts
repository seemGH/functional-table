import {Pipe, PipeTransform} from '@angular/core';
import {UserNameModel} from '../models';

@Pipe({
  name: 'fullName',
  standalone: true
})
export class FullNamePipe implements PipeTransform {
  transform(name: UserNameModel): string {
    if (!name) return '';
    return `${name.first} ${name.last}`;
  }
}
