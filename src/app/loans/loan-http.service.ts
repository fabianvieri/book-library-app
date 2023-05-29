import { Injectable } from '@angular/core';
import { Loan } from './loan.model';
import { HttpClient } from '@angular/common/http';
import { flatMap, switchMap } from 'rxjs';
import { BookHttpService } from '../books/book-http.service';

@Injectable({
  providedIn: 'root',
})
export class LoanHttpService {
  private loanUrl =
    'https://web-api-952c7-default-rtdb.asia-southeast1.firebasedatabase.app/loan.json';

  constructor(private http: HttpClient, private bookService: BookHttpService) {}

  addLoan(loan: Loan) {
    return this.http.post(this.loanUrl, loan).pipe(
      switchMap((response) => {
        return this.bookService.getBookById(loan.bookId);
      }),
      switchMap((book) => {
        const newBook = {
          [loan.bookId]: {
            ...book,
            quantity: book.quantity - 1,
          },
        };
        return this.bookService.updateBook(newBook);
      })
    );
  }
}
