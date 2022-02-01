import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';
@Injectable({
  providedIn: 'root',
})
export class MealService {
  allMeal: Subject<any[]>;
  url = environment.apiUrl + '/meals';

  constructor(private userService: UserService, private http: HttpClient) {
    let meals = localStorage.meals || '[]';
    this.allMeal = new BehaviorSubject(JSON.parse(meals));
  }

  get() {
    this.update();
    return this.allMeal;
  }

  update() {
    const user = this.userService.fetchDetails();
    const {
      user_details: { id },
    } = user;

    this.http.get(`${this.url}/all/${id}`).subscribe((data: any[]) => {
      localStorage.meals = JSON.stringify(data);
      this.allMeal.next(data);
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
    return this.http.post(`${this.url}/create`, {
      ...data,
      time: new Date(),
      user_id: id,
      id: Math.floor(Math.random() * 1000000 + 1),
    });
  }
}
