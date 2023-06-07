import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  subAdmin: Subscription = Subscription.EMPTY;
  isAuthenticated = false;
  adminName = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subAdmin = this.authService.adminSubject.subscribe((admin) => {
      this.isAuthenticated = !!admin;
      if (admin) this.adminName = admin.displayName;
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subAdmin.unsubscribe();
  }
}
