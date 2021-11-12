import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global/global.service';
import { UpdatePictureComponent } from '../update-picture/update-picture.component';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    public modalController: ModalController,
    private global: GlobalService
  ) {}

  ngOnInit() {}
  async showUpdateProfile() {
    const modal = await this.modalController.create({
      component: UpdateProfileComponent,
      cssClass: 'modal-90',
    });
    await modal.present();
  }

  async showUpdateImage() {
    const modal = await this.modalController.create({
      component: UpdatePictureComponent,
      cssClass: 'modal-50',
    });
    await modal.present();
  }
  async updateTipNotification() {
    const { role } = <{ role }>await this.global.alert(
      'Daily tip notification',
      'Do you want to recieve daily notification from this app?',
      [
        { role: false, text: 'NO' },
        { role: true, text: 'YES' },
      ]
    );
    console.log(role);
  }
}