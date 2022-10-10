import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class WalkService {
  walk: Subject<any[]>;
  url = environment.apiUrl + '/reminders';
  constructor(private userService: UserService) {
    const user = this.userService.fetchDetails();
    const { user_details } = user;
    this.walk = new BehaviorSubject(
      JSON.parse(localStorage.walk || `{"email": "${user_details.email}"}`)
    );
  }

  get() {
    this.update();
    return this.walk;
  }

  update() {
    const user = this.userService.fetchDetails();
    const { user_details } = user;
    this.walk.next(
      JSON.parse(localStorage.walk || `{"email": "${user_details.email}"}`)
    );
  }

  register(data) {
    localStorage.walk = JSON.stringify(data);
  }
}
