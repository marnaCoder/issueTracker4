import { Pipe, PipeTransform } from '@angular/core';
import { Issue } from './issue-list/issue.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Issue[], id: number, serverity: string, status: string, createdDate: string, resolvedDate: string): any {
    let filterValue: Issue[] = [];
    if (id) {
      filterValue = value.filter( item => item.id === id);
    } else {
      filterValue = value;

    }
    if (serverity !== '') {
      filterValue = filterValue.filter( item => item.serverity === serverity);
    }
    if (status !== '') {
      filterValue = filterValue.filter( item => item.status === status);
    }if (createdDate !== '') {
      filterValue = filterValue.filter( item => item.createdDate === createdDate);
    }if (resolvedDate !== '') {
      filterValue = filterValue.filter( item => item.resolvedDate === resolvedDate);
    }

    return filterValue;
  }

}
