import { Injectable } from '@angular/core';
import { Loan, LoanData } from './loan.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, switchMap } from 'rxjs';
import { BookHttpService } from '../books/book-http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoanHttpService {
  private baseUrl = environment.apiUrl;
  private loanUrl = `${this.baseUrl}/loan.json`;

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

  getLoanByBookId(id: string) {
    const params = new HttpParams()
      .set('orderBy', '"bookId"')
      .set('equalTo', `"${id}"`);

    return this.http
      .get<LoanData>(this.loanUrl, {
        params,
      })
      .pipe(
        map((loans) => {
          return Object.keys(loans).map((key) => ({ id: key, ...loans[key] }));
        })
      );
  }

  returnBook(loanId: string, bookId: string, loan: Partial<Loan>) {
    console.log(loanId, bookId, loan);

    return this.http.patch(`${this.baseUrl}/loan/${loanId}.json`, loan).pipe(
      switchMap((response) => {
        return this.bookService.getBookById(bookId);
      }),
      switchMap((book) => {
        const newBook = {
          [bookId]: {
            ...book,
            quantity: book.quantity + 1,
          },
        };
        return this.bookService.updateBook(newBook);
      })
    );
  }
}
