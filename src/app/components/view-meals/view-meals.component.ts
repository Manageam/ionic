import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MealsListComponent } from '../meals-list/meals-list.component';
import { ViewMealComponent } from '../view-meal/view-meal.component';

@Component({
  selector: 'app-view-meals',
  templateUrl: './view-meals.component.html',
  styleUrls: ['./view-meals.component.scss'],
})
export class ViewMealsComponent implements OnInit {
  segment = 'current';
  constructor(public modalController: ModalController) {}

  ngOnInit() {
    this.addMeal('breakfast');
  }
  segmentChanged(e) {
    this.segment = e.detail.value;
  }
  async showMeal(meal) {
    const modal = await this.modalController.create({
      component: ViewMealComponent,
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
    });
    await modal.present();
  }

  async addMeal(type = 'breakfast') {
    const modal = await this.modalController.create({
      component: MealsListComponent,
      componentProps: {
        type,
      },
    });
    await modal.present();
  }
}
