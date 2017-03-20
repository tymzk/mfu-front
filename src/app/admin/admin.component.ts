import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  template: `<router-outlet></router-outlet>`,
  providers: [ AdminService ]
})
export class AdminComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private adminService: AdminService
  ) {
    console.log(this.authService.isAuthenticated());
  }

  ngOnInit() {
  }
}
