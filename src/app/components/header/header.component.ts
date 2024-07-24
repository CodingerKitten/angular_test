import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentTime: string = new Date().toLocaleTimeString();
  timeSubscription!: Subscription;

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit() {
    this.timeSubscription = interval(1000).subscribe(() => {
      this.currentTime = new Date().toLocaleTimeString();
    });
  }

  ngOnDestroy() {
    this.timeSubscription.unsubscribe();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
    console.log('Logged out successfully.');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('authToken') !== null;
  }

  getUsername(): string {
    return localStorage.getItem('username') || 'Guest';
  }
}