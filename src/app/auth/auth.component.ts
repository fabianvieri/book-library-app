import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;
  isError = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

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
        console.log('sucess login', response);
        this.isError = false;
        this.router.navigate(['/books']);
      },
      error: (error) => {
        this.isError = true;
      },
    });
  }
}
