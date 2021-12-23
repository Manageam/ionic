import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class HealthService {
  url = environment.apiUrl + '/health';
  allhbac1: Subject<any[]>;
  health: Subject<any>;
  constructor(private http: HttpClient, private userService: UserService) {
    const user = this.userService.fetchDetails();
    const {
      user_details: { id },
    } = user;
    const { hba1c, health } = user;
    this.allhbac1 = new BehaviorSubject(hba1c);
    this.health = new BehaviorSubject(health);
  }

  getHba1c() {
    this.updateHba1c();
    return this.allhbac1;
  }

  getHealth() {
    this.updateHealth();
    return this.health;
  }
  updateHba1c() {
    const user = this.userService.fetchDetails();
    const {
      user_details: { id },
    } = user;

    this.http.get(`${this.url}/allHba1c/${id}`).subscribe((data: any[]) => {
      this.userService.setDetails({ ...user, hba1c: data });
      this.allhbac1.next(data);
    });
  }

  addHealth(diabetics) {
    const user = this.userService.fetchDetails();
    const {
      user_details: { id },
    } = user;

    return this.http.post(`${this.url}/update_health/${id}`, {
      diabetics: Number(diabetics),
      user_id: id,
      time: new Date(),
    });
  }

  updateHealth() {
    const user = this.userService.fetchDetails();
    const {
      user_details: { id },
    } = user;

    this.http
      .get(`${this.url}/all/${id}`)
      .subscribe(({ diabetics }: { diabetics }) => {
        this.userService.setDetails({ ...user, health: diabetics });
        this.health.next(diabetics);
      });
  }

  remove(d) {
    const user = this.userService.fetchDetails();
    const {
      user_details: { id },
    } = user;
    return this.http.delete(`${this.url}/deleteHba1c/${d}?user_id=${id}`);
  }

  addHba1c(data) {
    const {
      user_details: { id },
    } = this.userService.fetchDetails();
    return this.http.post(`${this.url}/addHba1c`, { ...data, user_id: id });
  }

  share(data) {
    const {
      user_details: { id },
    } = this.userService.fetchDetails();
    return this.http.post(`${environment.apiUrl}/share/shareMail`, {
      ...data,
      user_id: id,
    });
  }
}
