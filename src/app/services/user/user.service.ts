import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { AuthenticationService } from '../authentication/authentication.service';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.apiUrl + '/users';
  user: any = {};
  details: Subject<any>;
  constructor(private http: HttpClient, private auth: AuthenticationService) {
    const { user_details } = this.fetchDetails();
    this.details = new BehaviorSubject(user_details);
  }

  getDetails() {
    const user = this.auth.loggedUser();
    return this.http.get(`${this.url}/details/${user.id}`);
  }

  setDetails(details) {
    console.log(details);
    this.details.next(details.user_details);
    localStorage.details = JSON.stringify(details);
  }

  userDetails() {
    return this.details;
  }

  fetchDetails() {
    const details = localStorage.details;
    return JSON.parse(details);
  }

  getPhoto() {
    const user = this.auth.loggedUser();
    return this.http.get(`${this.url}/userPhoto/${user.id}`);
  }

  updateDetails(data) {
    const user = this.auth.loggedUser();
    return this.http.post(`${this.url}/update/${user.id}`, data);
  }

  login(data) {
    return this.http.post(`${this.url}/login`, data);
  }
  logout() {
    localStorage.clear();
  }

  register(data) {
    return this.http.post(`${this.url}/register`, data);
  }

  updatePhoto(data) {
    const user = this.auth.loggedUser();
    return this.http.post(`${this.url}/photo/${user.id}`, data);
  }

  resetPassword(data) {
    return this.http.post(`${this.url}/generateresetpassword`, data);
  }

  changePassword(data) {
    const user = this.auth.loggedUser();
    return this.http.post(`${this.url}/password/${user.id}`, data);
  }

  fetchTip() {
    this.http.get(`${environment.apiUrl}/dailytips/all`).subscribe((data) => {
      localStorage.tip = JSON.stringify(data[0]);
    });

    const tip = localStorage.tip || '{}';
    return JSON.parse(tip);
  }
}
