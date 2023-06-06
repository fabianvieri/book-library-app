import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserHttpService } from '../user-http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  isLoading = false;
  isError = false;
  isSuccess = false;
  isDeleteError = false;
  isDeleteSuccess = false;
  customErrorMessage = '';

  constructor(
    private userService: UserHttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users.filter((user) => user.isDeleted === false);
        this.isLoading = false;
        this.isError = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.isError = true;
      },
    });
  }

  goToEditPage(user: User) {
    this.router.navigate([user.id, 'edit'], {
      relativeTo: this.route,
      state: user,
    });
  }

  onDeleteUser(user: User) {
    if (confirm('Are you sure want to delete this user?')) {
      const deletedUser = {
        [user.id]: {
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          isDeleted: true,
        },
      };

      this.userService.updateUser(deletedUser, user.id).subscribe({
        next: (data) => {
          console.log('success deleting user', data);
          this.users = this.users.filter((u) => u.id !== user.id);
          this.isDeleteSuccess = true;
          this.isDeleteError = false;
        },
        error: (error) => {
          if (error.cause && error.cause === 'LOAN_EXISTS')
            this.customErrorMessage = 'Error Delete : User has Loan';
          else this.customErrorMessage = '';

          this.isDeleteError = true;
          this.isDeleteSuccess = false;
        },
      });
    }
  }
}
