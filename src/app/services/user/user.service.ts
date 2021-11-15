import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { AuthenticationService } from '../authentication/authentication.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.apiUrl + 'user';
  user: any = {};
  constructor(private http: HttpClient, private auth: AuthenticationService) {}

  getInfo() {
    const user = this.auth.loggedUser();
    return this.http.get(`${this.url}/${user.id}/info`);
  }
  updateInfo(data) {
    const user = this.auth.loggedUser();
    return this.http.put(`${this.url}/${user.id}/profile`, data);
  }
}
