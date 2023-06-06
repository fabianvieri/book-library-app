import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Book, BookData } from './book.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookHttpService {
  private baseUrl = environment.apiUrl;
  private bookUrl = `${this.baseUrl}/book.json`;

  constructor(private http: HttpClient) {}

  getBooks() {
    return this.http.get<BookData>(this.bookUrl).pipe(
      map((books) => {
        return Object.keys(books).map((key) => ({
          id: key,
          ...books[key],
        }));
      })
    );
  }

  getBookById(id: string) {
    return this.http.get<Book>(`${this.baseUrl}/book/${id}.json`);
  }

  getBookByCategory(category: string) {
    const params = new HttpParams()
      .set('orderBy', '"category"')
      .set('equalTo', `"${category}"`);

    return this.http.get<BookData>(this.bookUrl, { params }).pipe(
      map((books) => {
        return Object.keys(books).map((key) => ({
          id: key,
          ...books[key],
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
