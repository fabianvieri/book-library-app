import { Component, OnInit } from '@angular/core';
import { BookHttpService } from '../books/book-http.service';
import { Book } from '../books/book.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
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
    this.router.navigate(['book', book.id], { state: book });
  }
}
