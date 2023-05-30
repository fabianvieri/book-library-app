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

@Component({
  selector: 'app-add-loan',
  templateUrl: './add-loan.component.html',
  styleUrls: ['./add-loan.component.css'],
})
export class AddLoanComponent implements OnInit {
  loanForm!: FormGroup;
  book!: Book;
  users: { name: string }[] = [{ name: 'Fabian' }];

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
    // this.route.data.subscribe(({ users }) => {
    //   this.users = users;
    this.loanForm = this.fb.group({
      user: ['', Validators.minLength(3)],
      fromDate: ['', Validators.required],
      toDate: [''],
    });
    // });

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
    const newLoan = {
      bookId: this.book.id,
      isReturn: false,
      ...this.loanForm.value,
    };

    this.loanService.addLoan(newLoan).subscribe({
      next: (data) => {
        console.log('success adding book', data);
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
