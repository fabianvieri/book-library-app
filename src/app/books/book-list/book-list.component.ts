import { Component, OnInit } from '@angular/core';
import { BookHttpService } from '../book-http.service';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  isLoading = false;
  isError = false;
  books: Book[] = [];

  constructor(private bookService: BookHttpService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.isLoading = false;
        this.isError = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.isError = true;
      },
    });
  }
}
