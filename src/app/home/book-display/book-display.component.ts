import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookHttpService } from 'src/app/books/book-http.service';
import { Book } from 'src/app/books/book.model';

@Component({
  selector: 'app-book-display',
  templateUrl: './book-display.component.html',
  styleUrls: ['./book-display.component.css'],
})
export class BookDisplayComponent implements OnInit {
  books: Book[] = [];
  isLoading = false;
  isError = false;

  constructor(private bookService: BookHttpService, private router: Router) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.isLoading = false;
        this.isError = false;
        this.books = data;
      },
      error: (error) => {
        this.isLoading = false;
        this.isError = true;
      },
    });
  }

  goToDetailPage(book: Book) {
    this.router.navigate(['books', book.id], { state: book });
  }
}
