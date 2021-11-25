import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global/global.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent implements OnInit {
  password = { password: '', confirmPassword: '' };
  constructor(
    public modalController: ModalController,
    private userService: UserService,
    private global: GlobalService
  ) {}

  ngOnInit() {}

  async save() {
    if (this.password.password != this.password.confirmPassword)
      return this.global.alert(
        'Change password',
        'Your passwords do not match',
        ['Okay']
      );
    const data = { password: this.password.password };

    this.userService.changePassword(data).subscribe(() => {
      this.global.alert('Change password', 'Your password has been changed!', [
        'Okay',
      ]);
    });
  }
}
