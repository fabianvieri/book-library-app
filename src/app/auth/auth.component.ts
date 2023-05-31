import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;
  isError = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.authForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.minLength(6)],
    });
  }

  onLogin() {
    const loginData = {
      returnSecureToken: true,
      ...this.authForm.value,
    };

    this.authService.login(loginData).subscribe({
      next: (response) => {
        console.log(response);
        this.isError = false;
      },
      error: (error) => {
        this.isError = true;
      },
    });
  }
}
