import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryFormService {
  constructor(private fb: FormBuilder) {}

  createCategoryForm(initialValue: Partial<Category> | null) {
    return this.fb.group({
      name: [initialValue?.name || '', Validators.minLength(3)],
      desc: [initialValue?.desc || '', Validators.minLength(3)],
    });
  }
}
