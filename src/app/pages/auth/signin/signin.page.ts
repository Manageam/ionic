import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ForgotPasswordComponent } from 'src/app/components/forgot-password/forgot-password.component';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  showPassword = false;
  data = {
    email: '',
    password: '',
  };
  constructor(
    private globalService: GlobalService,
    private userService: UserService,
    private router: Router,
    private auth: AuthenticationService,
    private modalController: ModalController
  ) {}

  ngOnInit() {}
  async resetPassword() {
    const modal = await this.modalController.create({
      component: ForgotPasswordComponent,
      cssClass: 'modal-40',
    });
    await modal.present();
  }
  login() {
    if (!this.data.email || !this.data.password) {
      return this.globalService.alert(
        'Login',
        'Please complete all the require information',
        ['Okay']
      );
    }
    this.userService.login(this.data).subscribe((user: any) => {
      const { user_details } = user;
      this.userService.setDetails(user);
      this.auth.login(user_details);
      this.router.navigate(['/']);
    });
  }
}
