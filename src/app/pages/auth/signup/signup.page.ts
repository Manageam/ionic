import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { UserService } from 'src/app/services/user/user.service';
import { HealthProfileComponent } from './health-profile/health-profile.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  showPassword = false;
  data = {
    email: '',
    password: '',
    name: '',
  };
  constructor(
    private globalService: GlobalService,
    private modalController: ModalController,
    private UserService: UserService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {}
  async register() {
    if (!this.data.email || !this.data.password || !this.data.name) {
      return this.globalService.alert(
        'Registration',
        'Please complete all the require information',
        ['Okay']
      );
    }

    const modal = await this.modalController.create({
      component: HealthProfileComponent,
      cssClass: 'modal-50',
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    this.UserService.register(this.data).subscribe((user: any) => {
      this.authService.login(user.user_details);
      this.UserService.getDetails().subscribe((data) => {
        this.UserService.setDetails(data);
      });
      if (data) {
        this.UserService.updateDetails(data).subscribe(async () => {
          await this.router.navigate(['/']);
        });
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
