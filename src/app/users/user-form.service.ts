import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserFormService {
  constructor(private fb: FormBuilder) {}

  createForm(initialValue: Partial<User> | null) {
    return this.fb.group({
      name: [initialValue?.name || '', Validators.minLength(3)],
      email: [initialValue?.email || '', Validators.email],
      address: [initialValue?.address || '', Validators.minLength(8)],
      phone: [
        initialValue?.phone || '',
        [Validators.pattern('^[0-9]{12}$'), Validators.required],
      ],
    });
  }
}
