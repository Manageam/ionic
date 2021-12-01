import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global/global.service';
import { UserService } from 'src/app/services/user/user.service';

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
    private global: GlobalService
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
