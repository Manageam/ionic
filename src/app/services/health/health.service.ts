import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class HealthService {
  url = environment.apiUrl + '/health';
  constructor(private http: HttpClient, private userService: UserService) {}

  getHba1c() {
    const user = this.userService.fetchDetails();
    const {
      user_details: { id },
    } = user;
    const { hba1c } = user;

    return hba1c;
  }

  updateHba1c() {
    const user = this.userService.fetchDetails();
    const {
      user_details: { id },
    } = user;

    this.http.get(`${this.url}/allHba1c/${id}`).subscribe((data) => {
      this.userService.setDetails({ ...user, hba1c: data });
    });
  }

  addHba1c(data) {
    const {
      user_details: { id },
    } = this.userService.fetchDetails();
    return this.http.post(`${this.url}/addHba1c`, { ...data, user_id: id });
  }
}
