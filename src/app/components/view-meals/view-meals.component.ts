import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { MealsListComponent } from '../meals-list/meals-list.component';
import { ViewMealComponent } from '../view-meal/view-meal.component';

@Component({
  selector: 'app-view-meals',
  templateUrl: './view-meals.component.html',
  styleUrls: ['./view-meals.component.scss'],
})
export class ViewMealsComponent implements OnInit {
  segment = 'current';
  constructor(
    public modalController: ModalController,
    private actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {}
  segmentChanged(e) {
    this.segment = e.detail.value;
  }
  async showMeal(meal) {
    const modal = await this.modalController.create({
      component: ViewMealComponent,
      componentProps: { meal },
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
    });
    await modal.present();
  }

  async addMeal() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select meal type',
      cssClass: 'image-action-sheet',
      buttons: [
        {
          text: 'Snacks',
          role: 'snacks',
        },
        {
          text: 'Breakfast',
          role: 'breakfast',
        },
        {
          text: 'Lunch',
          role: 'lunch',
        },
        {
          text: 'Dinner',
          role: 'dinner',
        },
      ],
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    if (role == 'backdrop') return;
    const modal = await this.modalController.create({
      component: MealsListComponent,
      componentProps: {
        type: role,
      },
    });
    await modal.present();
  }
}
