import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { LocationsComponent } from 'src/app/components/locations/locations.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentRoute = '';
  constructor(
    private menuController: MenuController,
    private router: Router,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.currentRoute = ev.url.split('/').slice(-1)[0];
      }
    });
    this.showLocation();
  }

  async toggleMenu() {
    await this.menuController.toggle();
  }

  async showLocation() {
    const modal = await this.modalController.create({
      component: LocationsComponent,
    });
    modal.present();
  }
}
