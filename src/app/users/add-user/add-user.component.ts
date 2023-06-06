import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserFormService } from '../user-form.service';
import { UserHttpService } from '../user-http.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  userForm!: FormGroup;
  isError = false;
  isSuccess = false;

  constructor(
    private form: UserFormService,
    private userService: UserHttpService
  ) {}

  ngOnInit(): void {
    this.userForm = this.form.createForm(null);
  }

  onAddUser() {
    const newUser = {
      ...this.userForm.value,
      isDeleted: false,
    };

    this.userService.addUser(newUser).subscribe({
      next: (data) => {
        console.log('success adding user', data);
        this.isSuccess = true;
        this.isError = false;
        this.userForm.reset();
      },
      error: (error) => {
        this.isError = true;
        this.isSuccess = false;
      },
    });
  }
}
