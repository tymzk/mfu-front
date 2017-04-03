import { Component, OnChanges } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { ApiService } from "../services/api.service";
import { Subscription } from 'rxjs';

import { Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
	isAuthenticated: boolean;
	isAllowedDomain: boolean;
	isAdministrator: boolean;

	userId: string;
	userName: string;

  subIsAuthenticated: Subscription;

	constructor(
		private apiService: ApiService,
		private authService: AuthService,
		public router : Router) {
		this.isAdministrator = false;

    this.subIsAuthenticated = this.authService.isAuthenticated$.subscribe(
      (userInfo) => {
        this.isAuthenticated = userInfo.isAuthenticated;
				this.isAllowedDomain = userInfo.isAllowedDomain;
				this.userId = userInfo.userId;
				this.userName = userInfo.name;
				if(this.isAuthenticated && this.isAllowedDomain && this.userId){
					this.apiService.isAdministrator(this.userId).subscribe(
						isAdmin => {
							this.isAdministrator = isAdmin;
						}
					);
				}else{
					this.isAdministrator = false;
				}
      }
    );
	}

	doLogin() {
		this.authService.doLogin();
	}

	doLogout() {
		this.authService.doLogout();
		this.router.navigateByUrl('/');
	}
}