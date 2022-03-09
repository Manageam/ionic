import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global/global.service';
import { UserService } from 'src/app/services/user/user.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { UpdatePasswordComponent } from '../update-password/update-password.component';
import { UpdatePictureComponent } from '../update-picture/update-picture.component';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = null;
  subs = [];
  constructor(
    public modalController: ModalController,
    private global: GlobalService,
    private userService: UserService,
    private platform: Platform,
    private webSocket: WebsocketService
  ) {}

  ngOnInit() {
    let sub = this.userService.userDetails().subscribe((data) => {
      this.user = data;
    });
    this.subs.push(sub);

    sub = this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
    this.subs.push(sub);
  }
  async showUpdateProfile() {
    const modal = await this.modalController.create({
      component: UpdateProfileComponent,
      cssClass: 'modal-90',
      componentProps: {
        user: this.user,
      },
    });
    await modal.present();
  }

  async showUpdateImage() {
    const modal = await this.modalController.create({
      component: UpdatePictureComponent,
      componentProps: {
        photo: this.user.photo,
      },
      cssClass: 'modal-50',
    });
    await modal.present();
  }

  async showChangePassword() {
    const modal = await this.modalController.create({
      component: UpdatePasswordComponent,
      cssClass: 'modal-50',
    });
    await modal.present();
  }

  async updateTipNotification() {
    const header = 'Daily tip notification';
    const notification = this.user.notification == 0 ? 1 : 0;
    const { role } = <{ role }>await this.global.alert(
      header,
      `Do you want to ${
        notification ? 'start' : 'stop'
      } recieving daily notifications from this app?`,
      [
        { role: false, text: 'NO' },
        { role: true, text: 'YES' },
      ]
    );
    if (role)
      this.userService.updateDetails({ notification }).subscribe((data) => {
        this.webSocket.emit('profile:update', {
          user_id: this.user.id,
        });
        const message = `You will ${
          notification ? 'now' : 'no longer'
        } recieve daily notifications from this app.`;
        this.global.alert(header, message, ['Okay']);
      });
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
