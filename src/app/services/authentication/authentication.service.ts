import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthenticationService {
  authState = new BehaviorSubject(false);
  authUserId = new BehaviorSubject('');

  constructor(
    private router: Router,
    private platform: Platform,
    public jwtHelper: JwtHelperService
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  ifLoggedIn() {
    localStorage.user ? this.authState.next(true) : this.authState.next(false);
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    const count = token.split('.').length;
    if (count !== 3) {
      return false;
    }

    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
    // return this.authState.value;
  }

  login(data) {
    localStorage.user = JSON.stringify(data);
    localStorage.token = data.accessToken;
  }

  async logout() {
    localStorage.clear();
    await this.router.navigate(['auth']);
    this.authState.next(false);
  }

  loggedUser() {
    return JSON.parse(localStorage.user);
  }
}
