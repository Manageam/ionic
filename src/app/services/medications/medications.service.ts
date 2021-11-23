import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import allMedications from 'src/assets/data/medications';
import { environment } from 'src/environments/environment.prod';
import { AuthenticationService } from '../authentication/authentication.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class MedicationsService {
  url = environment.apiUrl + '/medication';
  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private userService: UserService
  ) {}

  all() {
    this.http.get(`${this.url}/all`).subscribe((data) => {
      localStorage.allMedications = JSON.stringify(data);
    });

    let sMedications =
      localStorage.allMedications || JSON.stringify(allMedications);
    localStorage.allMedications = sMedications;
    return JSON.parse(sMedications);
  }

  myMedications() {
    const user = this.userService.fetchDetails();
    const {
      user_details: { id },
    } = user;
    const { medications } = user;
    this.http.get(`${this.url}/user_medication/${id}`).subscribe((med) => {
      this.userService.setDetails({ ...user, med });
    });

    return medications;
  }
}
