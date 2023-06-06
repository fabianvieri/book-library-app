import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CategoryHttpService } from '../category-http.service';
import { CategoryFormService } from '../category-form.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  categoryForm!: FormGroup;
  isError = false;
  isSuccess = false;

  constructor(
    private categoryService: CategoryHttpService,
    private category: CategoryFormService
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.category.createCategoryForm(null);
  }

  onAddCategory() {
    const newCtg = {
      isDeleted: false,
      ...this.categoryForm.value,
    };

    this.categoryService.addCategory(newCtg).subscribe({
      next: (data) => {
        this.isSuccess = true;
        this.isError = false;
        this.categoryForm.reset();
      },
      error: (error) => {
        this.isSuccess = false;
        this.isError = true;
      },
    });
  }
}
