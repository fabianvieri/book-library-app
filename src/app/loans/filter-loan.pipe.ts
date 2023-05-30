import { Pipe, PipeTransform } from '@angular/core';
import { Loan } from './loan.model';

@Pipe({
  name: 'filterLoan',
})
export class FilterLoanPipe implements PipeTransform {
  transform(
    value: Loan[],
    filterValue: string | boolean,
    props: keyof Loan
  ): Loan[] {
    if (value.length === 0) {
      return value;
    }
    return value.filter((book) => book[props] === filterValue);
  }
}
