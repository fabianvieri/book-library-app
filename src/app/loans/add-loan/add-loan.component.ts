import { Component, OnInit } from '@angular/core';
import { LoanHttpService } from '../loan-http.service';
import { ActivatedRoute, Params } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Book } from 'src/app/books/book.model';
import { DateValidator } from './date-validator';
import { UserHttpService } from 'src/app/users/user-http.service';
import { User } from 'src/app/users/user.model';
import { Loan } from '../loan.model';

@Component({
  selector: 'app-add-loan',
  templateUrl: './add-loan.component.html',
  styleUrls: ['./add-loan.component.css'],
})
export class AddLoanComponent implements OnInit {
  loanForm!: FormGroup;
  book!: Book;
  users: User[] = [];

  isError = false;
  isSuccess = false;
  currentFromDate = '';

  constructor(
    private fb: FormBuilder,
    private loanService: LoanHttpService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.book = history.state as Book;
    this.route.data.subscribe(({ users }) => {
      this.users = users;
      this.loanForm = this.fb.group({
        user: ['', Validators.required],
        fromDate: ['', Validators.required],
        toDate: [''],
      });
    });

    this.loanForm.get('fromDate')?.valueChanges.subscribe((value) => {
      if (value) {
        this.loanForm
          .get('toDate')
          ?.setValidators([
            Validators.required,
            DateValidator.dateMinimum(value),
          ]);
      }
      this.loanForm.get('toDate')?.updateValueAndValidity();
    });
  }

  onAddLoan() {
    const userLoan = this.users.find(
      (user) => user.id === this.loanForm.value['user']
    );

    if (userLoan) {
      const newLoan = {
        bookId: this.book.id,
        fromDate: this.loanForm.value['fromDate'],
        toDate: this.loanForm.value['toDate'],
        user: userLoan,
        isReturn: false,
      };

      this.loanService.addLoan(newLoan).subscribe({
        next: (data) => {
          this.isSuccess = true;
          this.isError = false;
          this.loanForm.reset();
        },
        error: (error) => {
          this.isError = true;
          this.isSuccess = false;
        },
      });
    }
  }
}
