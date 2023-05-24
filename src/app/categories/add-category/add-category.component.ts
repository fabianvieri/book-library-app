import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { CategoryData } from '../category.model';
import { CategoryHttpService } from '../category-http.service';
import { CategoryFormService } from '../category-form.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  categoryForm!: FormGroup;
  constructor(private categoryService: CategoryHttpService,private category: CategoryFormService) {}
  
  ngOnInit(): void {
    this.categoryForm = this.category.createCategoryForm(null);
  }

  onAddCategory() {
    // Send Http 
    this.categoryService.addCategory(this.categoryForm.value).subscribe({
      next: (data) => {
        console.log('success adding category', data);
        this.categoryForm.reset();
      },
    });
  }
}
