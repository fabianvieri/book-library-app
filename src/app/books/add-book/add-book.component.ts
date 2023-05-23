import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookHttpService } from '../book-http.service';
import { BookFormService } from '../book-form.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  bookForm!: FormGroup;
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
        this.bookForm.reset();
      },
    });
  }
}
