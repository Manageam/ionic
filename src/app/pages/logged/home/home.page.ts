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
    this.userService.details.subscribe((data) => {
      this.user = data;
    });
    this.tip = this.userService.fetchTip();
  }
}
