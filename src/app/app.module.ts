import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { LoansComponent } from './loans/loans.component';
import { FilterBookPipe } from './books/filter-book.pipe';
import { AddLoanComponent } from './loans/add-loan/add-loan.component';
import { LoanDetailComponent } from './loans/loan-detail/loan-detail.component';
import { LoanListComponent } from './loans/loan-list/loan-list.component';
import { LoanComponent } from './loans/loan/loan.component';
import { FilterLoanPipe } from './loans/filter-loan.pipe';

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
    FilterLoanPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
