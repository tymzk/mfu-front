import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { ApiService } from "../services/api.service";

import { Router} from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
	constructor(
		private apiService: ApiService,
		private authService: AuthService,
		public router : Router) {
	}

	get administrator(){
		return this.authService.isAuthenticated() && true;
	}

	get authenticated(){
		return this.authService.isAuthenticated();
	}

	doLogin() {
		this.authService.doLogin();
	}

	get allowedDomain(){
		return this.authService.isAllowedDomain();
	}

	doLogout() {
		this.authService.doLogout();
		this.router.navigateByUrl('/');
	}
	get userId() {
    return this.authService.getId();
	}

	get userName() {
		return this.authService.getUserName();
	}
}