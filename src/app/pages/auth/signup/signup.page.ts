import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global/global.service';

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
  constructor(private globalService: GlobalService) {}

  ngOnInit() {}
  register() {
    if (!this.data.email || !this.data.password || !this.data.name) {
      return this.globalService.alert(
        'Registration',
        'Please complete all the require information',
        ['Okay']
      );
    }
  }
}
