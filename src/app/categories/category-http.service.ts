import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Category, CategoryData } from './category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryHttpService {
  private baseUrl = environment.apiUrl;
  private categoryUrl = `${this.baseUrl}/category.json`;

  constructor(private http: HttpClient) {}

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

  updateCategory(category: CategoryData) {
    return this.http.patch(this.categoryUrl, category);
  }

  deleteCategory(category: Category) {
    return this.http.delete(`${this.baseUrl}/category/${category.id}.json`);
  }
}
