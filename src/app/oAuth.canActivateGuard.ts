import { Injectable } from '@angular/core';
import { CanActivate , Router} from '@angular/router';
import { AuthService } from "./services/auth.service";

@Injectable()
export class CanActivateViaOAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    public router : Router) {

  }
  canActivate() {
    if (!this.authService.isAuthenticated()) {
      console.log("is not authenticated.");
      this.router.navigateByUrl('/');
    }else if (!this.authService.isAllowedDomain()) {
      console.log("is authenticated but is not allowed domain.");
      this.router.navigateByUrl('/');
    }else{
      console.log("is authenticated and is allowed domain.");
    }
    return (!this.authService.isAuthenticated()) ? false : true;
  }
}
