import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global/global.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent implements OnInit {
  password = { password: '', confirmPassword: '' };
  subs = [];
  constructor(
    public modalController: ModalController,
    private userService: UserService,
    private global: GlobalService,
    private platform: Platform
  ) {}

  ngOnInit() {
    let sub = this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
    this.subs.push(sub);
  }

  async save() {
    if (this.password.password != this.password.confirmPassword)
      return this.global.alert(
        'Change password',
        'Your passwords do not match',
        ['Okay']
      );
    const data = { password: this.password.password };

    this.userService.changePassword(data).subscribe(() => {
      this.global.alert('Update password', 'Password successfully updated!', [
        'Okay',
      ]);
    });
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
