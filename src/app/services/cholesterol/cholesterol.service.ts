import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class CholesterolService {
  cholesterol: Subject<any[]>;
  url = environment.apiUrl + '/health';

  constructor(private userService: UserService, private http: HttpClient) {
    const user = this.userService.fetchDetails();
    const { cholesterol } = user;
    this.cholesterol = new BehaviorSubject(cholesterol);
  }

  get() {
    return this.cholesterol;
  }

  update() {
    const user = this.userService.fetchDetails();
    const {
      user_details: { id },
    } = user;

    this.http
      .get(`${this.url}/allCholesterol/${id}`)
      .subscribe((data: any[]) => {
        this.userService.setDetails({ ...user, cholesterol: data });
        this.cholesterol.next(data);
      });
  }

  remove(d) {
    const user = this.userService.fetchDetails();
    const {
      user_details: { id },
    } = user;
    return this.http.delete(`${this.url}/deleteCholesterol/${d}?user_id=${id}`);
  }

  add(data) {
    const {
      user_details: { id },
    } = this.userService.fetchDetails();
    return this.http.post(`${this.url}/addCholesterol`, {
      ...data,
      user_id: id,
    });
  }
}
