import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global/global.service';
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
    private modalController: ModalController
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
    console.log(data);
  }
}
