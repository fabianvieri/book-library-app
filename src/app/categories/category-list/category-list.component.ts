import { Component, Input, OnInit } from '@angular/core';
import { Category, CategoryData } from '../category.model';
import { CategoryHttpService } from '../category-http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  isLoading = false;
  isError = false;
  isSuccess = false;
  isDeleteError = false;
  isDeleteSuccess = false;
  customErrorMessage = '';

  constructor(
    private categoryService: CategoryHttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.isLoading = false;
        this.isError = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.isError = true;
      },
    });
  }

  goToEditCategory(category: Category) {
    this.router.navigate([category.id, 'edit'], {
      relativeTo: this.route,
      state: category,
    });
  }

  onDeleteCategory(category: Category) {
    if (confirm('Are you sure to delete this category?')) {
      const deletedCtg = {
        [category.id]: {
          name: category.name,
          desc: category.desc,
          isDeleted: true,
        },
      };

      this.categoryService.updateCategory(deletedCtg, category.name).subscribe({
        next: (data) => {
          this.categories = this.categories.filter(
            (ctg) => ctg.id !== category.id
          );
          this.isDeleteSuccess = true;
          this.isDeleteError = false;
        },
        error: (error) => {
          if (error.cause && error.cause === 'BOOK_EXISTS')
            this.customErrorMessage = 'Error Delete : Category is Used';
          else this.customErrorMessage = '';

          this.isDeleteError = true;
          this.isDeleteSuccess = false;
        },
      });
    }
  }
}
