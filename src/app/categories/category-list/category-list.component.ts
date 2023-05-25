import { Component, Input, OnInit } from '@angular/core';
import { Category, CategoryData } from '../category.model';
import { CategoryHttpService } from '../category-http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  @Input() category!: Category;

  constructor(private categoryService: CategoryHttpService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  goToEditCategory(category: Category) {
      this.router.navigate([category.id, 'edit'], {
        relativeTo: this.route,
        state: category,
      });
  }

  onDeleteCategory(category: Category){
    if(confirm("Are you sure to delete "+ category.name)) {
      this.categoryService.deleteCategory(category).subscribe();
      this.categoryService.getCategories().subscribe((data) => {
        this.ngOnInit();
      });
    }
    
  }


}
