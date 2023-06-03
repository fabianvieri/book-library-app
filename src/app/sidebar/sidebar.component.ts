import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  subAdmin: Subscription = Subscription.EMPTY;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subAdmin = this.authService.adminSubject.subscribe((admin) => {
      this.isAuthenticated = !!admin;
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subAdmin.unsubscribe();
  }
}
