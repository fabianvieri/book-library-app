import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BookHttpService } from '../book-http.service';
import { BookFormService } from '../book-form.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  bookForm!: FormGroup;
  isError = false;
  isSuccess = false;
  categories: { name: string }[] = [
    {
      name: 'Horror',
    },
    {
      name: 'Romance',
    },
    {
      name: 'Fiction',
    },
  ];

  constructor(
    private form: BookFormService,
    private bookService: BookHttpService
  ) {}

  ngOnInit(): void {
    this.bookForm = this.form.createForm(null);
  }

  onAddBook() {
    this.bookService.addBook(this.bookForm.value).subscribe({
      next: (data) => {
        console.log('success adding book', data);
        this.isSuccess = true;
        this.isError = false;
        this.bookForm.reset();
      },
      error: (error) => {
        this.isError = true;
        this.isSuccess = false;
      },
    });
  }
}
