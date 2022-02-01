import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private http: HttpClient, private userService: UserService) {}

  pushFCMToken(token) {
    const user = this.userService.fetchDetails();
    const {
      user_details: { id },
    } = user;
    const data = new FormData();
    data.append('fcm_token', token);
    data.append('user_id', id);
    return this.http.post(`${environment.apiUrl}/token`, data);
  }
}
