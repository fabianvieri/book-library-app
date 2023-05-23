import { Component, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BookHttpService } from '../book-http.service';
import { BookFormService } from '../book-form.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})
export class EditBookComponent implements OnInit {
  book!: Book;
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
    this.book = history.state as Book;
    this.bookForm = this.form.createForm(this.book);
  }

  onEditBook() {
    const updateBook = {
      [this.book.id]: this.bookForm.value,
    };

    this.bookService.updateBook(updateBook).subscribe((data) => {
      console.log('success editing book', data);
    });
  }
}
