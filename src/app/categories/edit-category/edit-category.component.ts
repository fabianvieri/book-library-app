import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CategoryFormService } from '../category-form.service';
import { CategoryHttpService } from '../category-http.service';
import { Category } from '../category.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit{
  category!: Category;
  categoryForm!: FormGroup;

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
      [this.category.id]: this.categoryForm.value,
    };

    this.categoryService.updateCategory(updateCategory).subscribe((data) => {
      console.log('success editing category', data);
    });
  }
}
