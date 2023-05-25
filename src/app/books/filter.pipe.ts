import { Pipe, PipeTransform } from '@angular/core';
import { Book } from './book.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(
    value: Book[],
    filterValue: number | string,
    props: keyof Book
  ): Book[] {
    if (value.length === 0) {
      return value;
    }
    return value.filter((book) => book[props] !== filterValue);
  }
}
