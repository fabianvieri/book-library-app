import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CategoryFormService } from '../category-form.service';
import { CategoryHttpService } from '../category-http.service';
import { Category } from '../category.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit {
  category!: Category;
  categoryForm!: FormGroup;
  isError = false;
  isSuccess = false;
  customErrorMessage = '';

  constructor(
    private form: CategoryFormService,
    private categoryService: CategoryHttpService
  ) {}

  ngOnInit(): void {
    this.category = history.state as Category;
    this.categoryForm = this.form.createCategoryForm(this.category);
  }

  onEditCategory() {
    const updateCategory = {
      [this.category.id]: {
        isDeleted: this.category.isDeleted,
        ...this.categoryForm.value,
      },
    };

    this.categoryService
      .updateCategory(updateCategory, this.category.name)
      .subscribe({
        next: (data) => {
          this.isSuccess = true;
          this.isError = false;
        },
        error: (error) => {
          if (error.cause && error.cause === 'BOOK_EXISTS')
            this.customErrorMessage = 'Error Edit : Category is Used';
          else this.customErrorMessage = '';

          this.isError = true;
          this.isSuccess = false;
        },
      });
  }
}
