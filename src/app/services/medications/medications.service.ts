import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import allMedications from 'src/assets/data/medications';
import { environment } from 'src/environments/environment.prod';
import { AuthenticationService } from '../authentication/authentication.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class MedicationsService {
  url = environment.apiUrl + '/medication';
  myMedications: Subject<any>;
  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private userService: UserService
  ) {
    const user = this.userService.fetchDetails();
    const { medications } = user;
    this.myMedications = new BehaviorSubject(medications);
  }

  all() {
    this.http.get(`${this.url}/all`).subscribe((data) => {
      localStorage.allMedications = JSON.stringify(data);
    });

    let sMedications =
      localStorage.allMedications || JSON.stringify(allMedications);
    localStorage.allMedications = sMedications;
    return JSON.parse(sMedications);
  }

  update() {
    const user = this.userService.fetchDetails();
    const {
      user_details: { id },
    } = user;
    this.http
      .get(`${this.url}/user_medication/${id}`)
      .subscribe((medications) => {
        this.userService.setDetails({ ...user, medications });
        this.myMedications.next(medications);
      });
  }

  get() {
    this.update();
    return this.myMedications;
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
      user_id: id,
    });
  }
}
