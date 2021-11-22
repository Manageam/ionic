import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { UserService } from 'src/app/services/user/user.service';

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
  constructor(
    private globalService: GlobalService,
    private userService: UserService,
    private router: Router,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {}
  login() {
    if (!this.data.email || !this.data.password) {
      return this.globalService.alert(
        'Login',
        'Please complete all the require information',
        ['Okay']
      );
    }
    this.userService.login(this.data).subscribe((user: any) => {
      const { user_details } = user;
      this.userService.setDetails(user);
      this.auth.login(user_details);
      this.router.navigate(['/']);
    });
  }
}
