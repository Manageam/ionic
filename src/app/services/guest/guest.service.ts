import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class GuestService {
  constructor(
    public authenticationService: AuthenticationService,
    private router: Router
  ) {}
  canActivate(): boolean {
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
