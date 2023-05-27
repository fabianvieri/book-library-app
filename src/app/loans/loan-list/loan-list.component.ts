import { Component, OnInit } from '@angular/core';
import { BookHttpService } from 'src/app/books/book-http.service';
import { Book } from 'src/app/books/book.model';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css'],
})
export class LoanListComponent implements OnInit {
  isLoading = true;
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
