import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { AddMealComponent } from 'src/app/components/add-meal/add-meal.component';
import { LocationsComponent } from 'src/app/components/locations/locations.component';
import { MealsListComponent } from 'src/app/components/meals-list/meals-list.component';
import { ViewMealsComponent } from 'src/app/components/view-meals/view-meals.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentRoute = '';
  showMenu = false;
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
  }

  async toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  async showLocation() {
    const modal = await this.modalController.create({
      component: LocationsComponent,
    });
    modal.present();
  }

  async showMeals() {
    const modal = await this.modalController.create({
      component: ViewMealsComponent,
    });
    modal.present();
  }
}
