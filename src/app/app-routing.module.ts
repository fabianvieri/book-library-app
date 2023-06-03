import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { AddBookComponent } from './books/add-book/add-book.component';
import { EditBookComponent } from './books/edit-book/edit-book.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { EditCategoryComponent } from './categories/edit-category/edit-category.component';
import { BookDetailComponent } from './home/book-detail/book-detail.component';
import { categoryResolver } from './resolvers/category.resolver';
import { LoansComponent } from './loans/loans.component';
import { AddLoanComponent } from './loans/add-loan/add-loan.component';
import { LoanDetailComponent } from './loans/loan-detail/loan-detail.component';
import { LoanListComponent } from './loans/loan-list/loan-list.component';
import { AuthComponent } from './auth/auth.component';
import { UsersComponent } from './users/users.component';
import { authGuard } from './auth/auth.guard';
import { BookDisplayComponent } from './home/book-display/book-display.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/books',
    pathMatch: 'full',
  },
  {
    path: 'books',
    component: HomeComponent,
    children: [
      { path: '', component: BookDisplayComponent },
      { path: ':id', component: BookDetailComponent },
    ],
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    children: [
      {
        path: 'books',
        component: BooksComponent,
        children: [
          { path: '', component: BookListComponent },
          {
            path: 'add',
            component: AddBookComponent,
            resolve: { categories: categoryResolver },
          },
          {
            path: ':id/edit',
            component: EditBookComponent,
            resolve: { categories: categoryResolver },
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
      {
        path: 'loans',
        component: LoansComponent,
        children: [
          { path: '', component: LoanListComponent },
          { path: ':id', component: LoanDetailComponent },
          { path: ':id/add', component: AddLoanComponent },
        ],
      },
      {
        path: 'users',
        component: UsersComponent,
      },
    ],
  },
  {
    path: 'login',
    component: AuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
