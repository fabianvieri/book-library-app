import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from './book.model';

@Injectable({
  providedIn: 'root',
})
export class BookFormService {
  constructor(private fb: FormBuilder) {}

  createForm(initialValue: Partial<Book> | null) {
    return this.fb.group({
      title: [initialValue?.title || '', Validators.minLength(3)],
      author: [initialValue?.author || '', Validators.minLength(3)],
      publisher: [initialValue?.publisher || '', Validators.minLength(3)],
      coverUrl: [
        initialValue?.coverUrl || '',
        Validators.pattern('(http(s?):/)(/[^/]+)+.(?:jpg|gif|png)'),
      ],
      quantity: [initialValue?.quantity || 0, Validators.min(0)],
      category: [
        initialValue?.category || '',
        [Validators.required, Validators.minLength(3)],
      ],
    });
  }
}
