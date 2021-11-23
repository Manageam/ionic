import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user: any = {};
  tip: any = {};
  constructor(private userService: UserService) {}

  ngOnInit() {
    const { user_details } = this.userService.fetchDetails();
    this.user = user_details;
    this.tip = this.userService.fetchTip();
  }
}
