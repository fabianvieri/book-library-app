import { Injectable } from '@angular/core';
import { LoginData, LoginResponse, Admin } from './auth.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = `${environment.authUrl}/accounts:signInWithPassword?key=${environment.apiKey}`;
  adminSubject = new Subject<Admin | null>();
  expirationTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this.adminSubject.next(null);
  }

  login(credential: LoginData) {
    return this.http
      .post<LoginResponse>(this.loginUrl, credential)
      .pipe(tap((response) => this.handleAuthentication(response)));
  }

  logout() {
    this.adminSubject.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('adminData');
    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer);
    }
    this.expirationTimer = null;
  }

  handleAuthentication(data: LoginResponse) {
    const admin: Admin = {
      id: data.localId,
      email: data.email,
      idToken: data.idToken,
      tokenExpirationDate: new Date(
        new Date().getTime() + Number(data.expiresIn) * 1000
      ),
    };
    localStorage.setItem('adminData', JSON.stringify(admin));
    this.adminSubject.next(admin);
  }

  autoLogin() {
    const adminData = localStorage.getItem('adminData');
    if (!adminData) return;

    const admin = JSON.parse(adminData);
    if (!admin) return;

    const loadedAdmin: Admin = {
      ...admin,
      tokenExpirationDate: new Date(admin.tokenExpirationDate),
    };

    if (loadedAdmin.idToken) {
      this.adminSubject.next(loadedAdmin);
      const expirationDuration =
        new Date(admin.tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(duration: number) {
    this.expirationTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }
}
