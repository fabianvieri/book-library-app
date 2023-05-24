import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { BookComponent } from './books/book/book.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { AddBookComponent } from './books/add-book/add-book.component';
import { EditBookComponent } from './books/edit-book/edit-book.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { EditCategoryComponent } from './categories/edit-category/edit-category.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'books',
    component: BooksComponent,
    children: [
      { path: '', component: BookListComponent },
      {
        path: 'add',
        component: AddBookComponent,
      },
      {
        path: ':id/edit',
        component: EditBookComponent,
      },
    ],
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    children: [
      { path: '', component: CategoryListComponent },
      {
        path: 'add',
        component: AddCategoryComponent,
      },
      {
        path: ':id/edit',
        component: EditCategoryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
