import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'statusLabel',
  standalone: true
})
export class StatusLabelPipe implements PipeTransform {
  transform(status: boolean): string {
    return status ? 'Active' : 'Inactive';
  }
}
