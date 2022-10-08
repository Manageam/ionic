import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  constructor(
    public authenticationService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (!this.authenticationService.isAuthenticated()) {
      this.router.navigate(['auth']);
      return false;
    }
    return true;
  }
}
