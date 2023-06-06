import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '../user.model';
import { UserFormService } from '../user-form.service';
import { UserHttpService } from '../user-http.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  user!: User;
  userForm!: FormGroup;
  isError = false;
  isSuccess = false;
  customErrorMessage = '';

  constructor(
    private form: UserFormService,
    private userService: UserHttpService
  ) {}

  ngOnInit(): void {
    this.user = history.state as User;
    this.userForm = this.form.createForm(this.user);
  }

  onEditUser() {
    const updateUser = {
      [this.user.id]: {
        isDeleted: this.user.isDeleted,
        ...this.userForm.value,
      },
    };

    this.userService.updateUser(updateUser, this.user.id).subscribe({
      next: (data) => {
        this.isSuccess = true;
        this.isError = false;
      },
      error: (error) => {
        if (error.cause && error.cause === 'LOAN_EXISTS')
          this.customErrorMessage = 'Error Edit : User has Loan';
        else this.customErrorMessage = '';

        this.isError = true;
        this.isSuccess = false;
      },
    });
  }
}
