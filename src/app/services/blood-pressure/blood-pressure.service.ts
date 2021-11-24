import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class BloodPressureService {
  allBloodPressure: Subject<any[]>;
  url = environment.apiUrl + '/health';

  constructor(private userService: UserService, private http: HttpClient) {
    const user = this.userService.fetchDetails();
    const { blood_pressure } = user;
    this.allBloodPressure = new BehaviorSubject(blood_pressure);
  }

  get() {
    return this.allBloodPressure;
  }

  update() {
    const user = this.userService.fetchDetails();
    const {
      user_details: { id },
    } = user;

    this.http
      .get(`${this.url}/allBloodPressure/${id}`)
      .subscribe((data: any[]) => {
        this.userService.setDetails({ ...user, blood_pressure: data });
        this.allBloodPressure.next(data);
      });
  }

  remove(d) {
    const user = this.userService.fetchDetails();
    const {
      user_details: { id },
    } = user;
    return this.http.delete(
      `${this.url}/deleteBloodPressure/${d}?user_id=${id}`
    );
  }

  add(data) {
    const {
      user_details: { id },
    } = this.userService.fetchDetails();
    return this.http.post(`${this.url}/addBloodPressure`, {
      ...data,
      user_id: id,
    });
  }
}
