import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { AuthenticationService } from '../authentication/authentication.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.apiUrl + '/users';
  user: any = {};
  constructor(private http: HttpClient, private auth: AuthenticationService) {}

  getDetails() {
    const user = this.auth.loggedUser();
    return this.http.get(`${this.url}/details/${user.id}`);
  }

  setDetails(details) {
    localStorage.details = JSON.stringify(details);
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

  register(data) {
    return this.http.post(`${this.url}/register`, data);
  }

  updatePhoto(id, data) {
    return this.http.post(`${this.url}/photo/${id}`, data);
  }

  resetPassword(data) {
    return this.http.post(`${this.url}/generateresetpassword`, data);
  }

  changePassword(id, data) {
    return this.http.post(`${this.url}/password/${id}`, data);
  }

  fetchTip() {
    this.http.get(`${environment.apiUrl}/dailytips/all`).subscribe((data) => {
      localStorage.tip = JSON.stringify(data[0]);
    });

    const tip = localStorage.tip || '{}';
    return JSON.parse(tip);
  }
}
