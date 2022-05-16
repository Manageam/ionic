import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class BmiService {
  bmi: Subject<any[]>;
  url = environment.apiUrl + '/health';

  constructor(private userService: UserService, private http: HttpClient) {
    const user = this.userService.fetchDetails();
    const { body_mass } = user;
    this.bmi = new BehaviorSubject(body_mass);
  }

  get() {
    this.update();
    return this.bmi;
  }

  update() {
    const user = this.userService.fetchDetails();
    const {
      user_details: { id },
    } = user;

    this.http.get(`${this.url}/allBodyMass/${id}`).subscribe((data: any[]) => {
      this.userService.setDetails({ ...user, body_mass: data });
      this.bmi.next(data);
    });
  }

  remove(d) {
    const user = this.userService.fetchDetails();
    const {
      user_details: { id },
    } = user;
    return this.http.delete(`${this.url}/deleteBodyMass/${d}?user_id=${id}`);
  }

  add(data) {
    const {
      user_details: { id },
    } = this.userService.fetchDetails();
    data = {
      ...data,
      user_id: id,
    };
    return this.http.post(`${this.url}/addBodyMass`, data);
  }
}
