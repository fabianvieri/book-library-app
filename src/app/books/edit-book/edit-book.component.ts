import { Component, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { FormGroup } from '@angular/forms';
import { BookHttpService } from '../book-http.service';
import { BookFormService } from '../book-form.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/categories/category.model';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})
export class EditBookComponent implements OnInit {
  book!: Book;
  bookForm!: FormGroup;
  isError = false;
  isSuccess = false;
  categories: Category[] = [];

  constructor(
    private form: BookFormService,
    private bookService: BookHttpService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.book = history.state as Book;
    this.route.data.subscribe(({ categories }) => {
      this.categories = categories;
      this.bookForm = this.form.createForm(this.book);
    });
  }

  onEditBook() {
    const updateBook = {
      [this.book.id]: this.bookForm.value,
    };

    this.bookService.updateBook(updateBook).subscribe({
      next: (data) => {
        console.log('success editing book', data);
        this.isSuccess = true;
        this.isError = false;
      },
      error: (error) => {
        this.isError = true;
        this.isSuccess = false;
      },
    });
  }
}
