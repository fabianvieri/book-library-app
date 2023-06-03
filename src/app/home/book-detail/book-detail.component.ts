import { Component, OnInit } from '@angular/core';
import { Book } from '../../books/book.model';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {
  book!: Book;

  ngOnInit(): void {
    this.book = history.state as Book;
  }
}
