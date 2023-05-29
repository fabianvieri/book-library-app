import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BookHttpService } from '../book-http.service';
import { BookFormService } from '../book-form.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/categories/category.model';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
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
    this.route.data.subscribe(({ categories }) => {
      this.categories = categories;
      this.bookForm = this.form.createForm(null);
    });
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
