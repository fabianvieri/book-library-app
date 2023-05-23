import { Component, Input } from '@angular/core';
import { Book } from '../book.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent {
  @Input() book!: Book;

  constructor(private router: Router, private route: ActivatedRoute) {}

  goToEditPage(book: Book) {
    this.router.navigate([this.book.id, 'edit'], {
      relativeTo: this.route,
      state: book,
    });
  }
}
