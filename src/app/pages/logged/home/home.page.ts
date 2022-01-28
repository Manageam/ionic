import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SearchComponent } from 'src/app/components/search/search.component';
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
    public router: Router
  ) {}

  ngOnInit() {
    this.userService.userDetails().subscribe((data) => {
      this.user = data;
      console.log(data);
    });
    this.userService.fetchTip().subscribe((data) => {
      this.tip = data;
    });
  }

  async showSearch() {
    const modal = await this.modalController.create({
      component: SearchComponent,
      cssClass: 'modal-70',
    });
    await modal.present();
  }
}
