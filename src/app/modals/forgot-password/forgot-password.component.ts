import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global/global.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  user = { email: '' };
  constructor(
    public modalController: ModalController,
    private global: GlobalService,
    private userService: UserService
  ) {}

  ngOnInit() {}
  save() {
    if (!this.user.email)
      return this.global.alert(
        'ManageAm account',
        'Email address is required!',
        'OK'
      );

    this.userService.resetPassword(this.user).subscribe((data: string) => {
      this.global.alert('ManageAm account', data, 'OK');
      this.modalController.dismiss();
    });
  }
}
