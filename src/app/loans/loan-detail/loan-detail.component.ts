import { Component, OnInit } from '@angular/core';
import { LoanHttpService } from '../loan-http.service';
import { Loan, LoanStatus } from '../loan.model';
import { Book } from 'src/app/books/book.model';

@Component({
  selector: 'app-loan-detail',
  templateUrl: './loan-detail.component.html',
  styleUrls: ['./loan-detail.component.css'],
})
export class LoanDetailComponent implements OnInit {
  loans: Loan[] = [];
  book!: Book;
  isLoading = false;
  isError = false;
  isReturnError = false;

  constructor(private loanService: LoanHttpService) {}

  ngOnInit(): void {
    this.book = history.state as Book;
    this.isLoading = true;
    this.loanService.getLoanByBookId(this.book.id).subscribe({
      next: (loans) => {
        this.isLoading = false;
        this.isError = false;
        this.loans = loans.filter((loan) => loan.isReturn === false);
      },
      error: (error) => {
        this.isLoading = false;
        this.isError = true;
      },
    });
  }

  onReturnBook(loan: Loan) {
    this.loanService
      .returnBook(loan.id, loan.bookId, { isReturn: true })
      .subscribe({
        next: (response) => {
          console.log('success return book', response);
          this.loans = this.loans.filter((l) => loan.id !== l.id);
          this.isReturnError = false;
        },
        error: (error) => {
          this.isReturnError = true;
        },
      });
  }

  getLoanStatus(to: string): LoanStatus {
    const toDate = new Date(to);
    const date = new Date();
    const d = date.getDate();
    const m = date.getMonth();
    const y = date.getFullYear();
    const today = new Date(y, m, d);
    return today > toDate ? LoanStatus.Fined : LoanStatus.InProcess;
  }

  get LoanStatus(): typeof LoanStatus {
    return LoanStatus;
  }
}
