import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class DateValidator {
  static dateMinimum(date: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const to = new Date(control.value);
      const from = new Date(date);
      if (from > to) return { invalidDate: true };
      return null;
    };
  }
}
