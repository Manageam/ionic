import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { UserService } from 'src/app/services/user/user.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent implements OnInit {
  @Input() user: any = {};
  subs = [];
  profile = {
    age: '',
    height: '',
    body_weight: '',
    phone: '',
    name: '',
    unit: '',
    gender: '',
  };

  constructor(
    public modalController: ModalController,
    private userService: UserService,
    private platform: Platform,
    private global: GlobalService,
    private webSocket: WebsocketService,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    for (let key in this.profile) {
      this.profile[key] = this.user[key];
    }

    let sub = this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
    this.subs.push(sub);
  }

  save() {
    this.userService.updateDetails(this.profile).subscribe((data) => {
      const details = this.userService.fetchDetails();
      this.userService.setDetails({ ...details, user_details: data });
      this.webSocket.emit('profile:update', {
        user_id: this.auth.loggedUser().id,
      });
      this.global.alert('Update Profile', 'Profile sucessfully updated!', [
        'OK',
      ]);
      this.modalController.dismiss();
    });
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
