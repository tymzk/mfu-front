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
    if (this.authService.isAuthenticated() && this.authService.isAllowedDomain()) {
      return true;
    }
    this.router.navigateByUrl('/');
    return false;
  }
}
