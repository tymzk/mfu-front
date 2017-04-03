import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnDestroy {
  subIsAuthenticated: Subscription;
  isAuthenticated: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
    ) {
    this.isAuthenticated = false;
    this.subIsAuthenticated = this.authService.isAuthenticated$.subscribe(
      (userInfo) => {
        this.isAuthenticated = userInfo.isAuthenticated
      }
    );
  }

  ngOnDestroy(){
    this.subIsAuthenticated.unsubscribe();
  }
}