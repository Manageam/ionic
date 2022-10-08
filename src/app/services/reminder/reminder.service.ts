import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class ReminderService {
  reminders: Subject<any[]>;
  url = environment.apiUrl + '/reminders';

  constructor(private http: HttpClient, private userService: UserService) {
    const reminders = localStorage.reminders || '[]';
    this.reminders = new BehaviorSubject(JSON.parse(reminders));
  }

  get() {
    this.update();
    return this.reminders;
  }

  update() {
    const user = this.userService.fetchDetails();
    const {
      user_details: { id },
    } = user;

    this.http.get(`${this.url}/all/${id}`).subscribe((data: any[]) => {
      localStorage.reminders = JSON.stringify(data);
      this.reminders.next(data);
    });
  }

  remove(d) {
    const user = this.userService.fetchDetails();
    const {
      user_details: { id },
    } = user;
    return this.http.delete(`${this.url}/delete/${d}?user_id=${id}`);
  }

  add(data) {
    const {
      user_details: { id },
    } = this.userService.fetchDetails();
    data = {
      ...data,
      user_id: id,
    };
    return this.http.post(`${this.url}/create`, data);
  }

  updateOne(id, data) {
    const {
      user_details: { id: userId },
    } = this.userService.fetchDetails();
    data = {
      ...data,
      user_id: userId,
    };
    return this.http.put(`${this.url}/update/${id}`, data);
  }
}
