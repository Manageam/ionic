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
    this.http.post(`${environment.apiUrl}/fcm-token`, {
      fcm_token: token,
      user_id: id,
    });
  }
}
