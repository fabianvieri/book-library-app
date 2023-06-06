import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Category, CategoryData } from './category.model';
import { environment } from 'src/environments/environment';
import { BookHttpService } from '../books/book-http.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryHttpService {
  private baseUrl = environment.apiUrl;
  private categoryUrl = `${this.baseUrl}/category.json`;

  constructor(private http: HttpClient, private bookService: BookHttpService) {}

  getCategories() {
    return this.http.get<CategoryData>(this.categoryUrl).pipe(
      map((categories) => {
        return Object.keys(categories).map((key) => ({
          id: key,
          ...categories[key],
        }));
      })
    );
  }

  addCategory(category: Category) {
    return this.http.post(this.categoryUrl, category);
  }

  updateCategory(category: CategoryData, ctgName: string) {
    return this.bookService.getBookByCategory(ctgName).pipe(
      switchMap((books) => {
        if (books.length === 0)
          return this.http.patch(this.categoryUrl, category);
        throw new Error('Custom-Error', { cause: 'BOOK_EXISTS' });
      })
    );
  }
}
