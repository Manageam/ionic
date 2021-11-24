import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class BloodSugarService {
  allBloodSugar: Subject<any[]>;
  url = environment.apiUrl + '/health';

  constructor(private userService: UserService, private http: HttpClient) {
    const user = this.userService.fetchDetails();
    const { blood_sugar } = user;
    this.allBloodSugar = new BehaviorSubject(blood_sugar);
  }

  get() {
    return this.allBloodSugar;
  }

  update() {
    const user = this.userService.fetchDetails();
    const {
      user_details: { id },
    } = user;

    this.http
      .get(`${this.url}/allBloodSugar/${id}`)
      .subscribe((data: any[]) => {
        this.userService.setDetails({ ...user, blood_sugar: data });
        this.allBloodSugar.next(data);
      });
  }

  remove(d) {
    const user = this.userService.fetchDetails();
    const {
      user_details: { id },
    } = user;
    return this.http.delete(`${this.url}/deleteBloodSugar/${d}?user_id=${id}`);
  }

  add(data) {
    const {
      user_details: { id },
    } = this.userService.fetchDetails();
    return this.http.post(`${this.url}/addBloodSugar`, {
      ...data,
      user_id: id,
    });
  }
}
