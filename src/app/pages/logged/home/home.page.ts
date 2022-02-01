import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SearchComponent } from 'src/app/components/search/search.component';
import { FcmService } from 'src/app/services/fcm/fcm.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user: any = {};
  tip: any = {};
  constructor(
    private userService: UserService,
    private modalController: ModalController,
    public router: Router,
    private fcmService: FcmService
  ) {}

  ngOnInit() {
    this.userService.userDetails().subscribe((data) => {
      this.user = data;
    });
    this.userService.fetchTip().subscribe((data) => {
      this.tip = data;
    });
    this.fcmService.init();
  }

  async showSearch() {
    const modal = await this.modalController.create({
      component: SearchComponent,
      cssClass: 'modal-70',
    });
    await modal.present();
  }
}
