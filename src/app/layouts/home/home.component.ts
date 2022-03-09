import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { LocationsComponent } from 'src/app/modals/locations/locations.component';
import { ViewMealsComponent } from 'src/app/modals/view-meals/view-meals.component';

import { LanguageSettingsComponent } from 'src/app/modals/language-settings/language-settings.component';
import { EducationService } from 'src/app/services/education/education.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentRoute = '';
  showMenu = false;
  languages = [];
  lang: any = {};
  user: any = {};
  constructor(
    private menuController: MenuController,
    private router: Router,
    private modalController: ModalController,
    private educationService: EducationService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.currentRoute = ev.url.split('/').slice(-1)[0] || 'home';
      }
    });

    this.educationService.languages.subscribe((lang) => {
      this.languages = lang;
      this.getLang();
    });

    this.userService.userDetails().subscribe((user) => {
      this.user = user;
      this.getLang();
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

  getLang() {
    if (this.languages.length == 0 || !this.user.language_id) {
      this.lang = 'language';
    } else {
      this.lang = this.languages.find(
        (lang) => lang.id == this.user.language_id
      )?.title;
    }
  }

  async openLanguages() {
    const modal = await this.modalController.create({
      component: LanguageSettingsComponent,
      cssClass: 'modal-70',
    });
    modal.present();
  }
}
