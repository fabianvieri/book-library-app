import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';;
import {map, catchError, tap} from 'rxjs/operators'
import {Subject, throwError} from 'rxjs';
import { Category, CategoryData } from './category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryHttpService {
  private endPointURL = 'https://web-api-952c7-default-rtdb.asia-southeast1.firebasedatabase.app/';
  categoryUrl: string = this.endPointURL+'category.json';

  errorHandling = new Subject<any>();

  constructor(private http: HttpClient){}

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

  deleteCategory(category: Category){
    return this.http.delete(this.endPointURL+"category/"+category.id+".json");
  }

}
