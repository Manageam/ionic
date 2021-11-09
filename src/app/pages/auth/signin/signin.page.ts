import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global/global.service';

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
  constructor(private globalService: GlobalService) {}

  ngOnInit() {}
  login() {
    if (!this.data.email || !this.data.password) {
      return this.globalService.alert(
        'Login',
        'Please complete all the require information',
        ['Okay']
      );
    }
  }
}
