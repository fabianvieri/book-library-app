import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { HomeComponent } from './home/home.component';
import { BookComponent } from './books/book/book.component';
import { AddBookComponent } from './books/add-book/add-book.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { EditBookComponent } from './books/edit-book/edit-book.component';
import { CategoriesComponent } from './categories/categories.component';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { CategoryComponent } from './categories/category/category.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { EditCategoryComponent } from './categories/edit-category/edit-category.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { BookDetailComponent } from './home/book-detail/book-detail.component';
import { LoansComponent } from './loans/loans.component';
import { FilterBookPipe } from './books/filter-book.pipe';
import { AddLoanComponent } from './loans/add-loan/add-loan.component';
import { LoanDetailComponent } from './loans/loan-detail/loan-detail.component';
import { LoanListComponent } from './loans/loan-list/loan-list.component';
import { LoanComponent } from './loans/loan/loan.component';
import { AuthComponent } from './auth/auth.component';
import { UsersComponent } from './users/users.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BookDisplayComponent } from './home/book-display/book-display.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserListComponent } from './users/user-list/user-list.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    HomeComponent,
    BookComponent,
    AddBookComponent,
    BookListComponent,
    EditBookComponent,
    CategoriesComponent,
    AddCategoryComponent,
    CategoryComponent,
    CategoryListComponent,
    EditCategoryComponent,
    SpinnerComponent,
    BookDetailComponent,
    FilterBookPipe,
    LoansComponent,
    AddLoanComponent,
    LoanDetailComponent,
    LoanListComponent,
    LoanComponent,
    AuthComponent,
    UsersComponent,
    SidebarComponent,
    BookDisplayComponent,
    UserListComponent,
    AddUserComponent,
    EditUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
