import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Book, BookData } from './book.model';

@Injectable({
  providedIn: 'root',
})
export class BookHttpService {
  private bookUrl =
    'https://web-api-952c7-default-rtdb.asia-southeast1.firebasedatabase.app/book.json';

  constructor(private http: HttpClient) {}

  getBooks() {
    return this.http.get<BookData>(this.bookUrl).pipe(
      map((books) => {
        return Object.keys(books).map((key) => ({
          id: key,
          title: books[key].title,
          author: books[key].author,
          publisher: books[key].publisher,
          coverUrl: books[key].coverUrl,
          category: books[key].category,
          quantity: books[key].quantity,
        }));
      })
    );
  }

  addBook(book: Book) {
    return this.http.post(this.bookUrl, book);
  }

  updateBook(book: BookData) {
    return this.http.patch(this.bookUrl, book);
  }
}
