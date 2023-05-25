import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CategoryHttpService } from '../categories/category-http.service';
import { Category } from '../categories/category.model';

export const categoryResolver: ResolveFn<Category[]> = (route, state) => {
  return inject(CategoryHttpService).getCategories();
};
