import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/books/book.model';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css'],
})
export class LoanComponent {
  @Input() book!: Book;

  constructor(private router: Router, private route: ActivatedRoute) {}

  goToAddLoanPage() {
    this.router.navigate([this.book.id, 'add'], {
      relativeTo: this.route,
      state: this.book,
    });
  }

  goToDetailPage() {
    this.router.navigate([this.book.id], {
      relativeTo: this.route,
      state: this.book,
    });
  }
}
