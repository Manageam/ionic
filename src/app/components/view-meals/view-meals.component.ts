import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { MealService } from 'src/app/services/meal/meal.service';
import { calorieCounter } from 'src/assets/scripts/misc';
import { MealsListComponent } from '../meals-list/meals-list.component';
import { ViewMealComponent } from '../view-meal/view-meal.component';

@Component({
  selector: 'app-view-meals',
  templateUrl: './view-meals.component.html',
  styleUrls: ['./view-meals.component.scss'],
})
export class ViewMealsComponent implements OnInit {
  segment = 'current';
  food: any = null;
  allCab = [];
  allPro = [];
  allFru = [];
  totalCals = 0;
  type = '';
  calInfo: any = null;
  constructor(
    public modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private mealService: MealService
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
    if (!this.type) {
      const actionSheet = await this.actionSheetController.create({
        header: 'Select meal type',
        cssClass: 'image-action-sheet',
        buttons: [
          {
            text: 'Snacks',
            role: 'Snacks',
          },
          {
            text: 'Breakfast',
            role: 'Breakfast',
          },
          {
            text: 'Lunch',
            role: 'Lunch',
          },
          {
            text: 'Dinner',
            role: 'Dinner',
          },
        ],
      });
      await actionSheet.present();

      const { role } = await actionSheet.onDidDismiss();
      if (role == 'backdrop') return;
      this.type = role;
    }
    this.type = 'Breakfast';
    const modal = await this.modalController.create({
      component: MealsListComponent,
      componentProps: {
        type: this.type,
        data: this.food || [],
      },
    });
    modal.onDidDismiss().then(({ data }: { data }) => {
      if (data.length == 0) return;
      this.food = data;
      this.allCab = this.food.filter((f) => f.category == 1);
      this.allPro = this.food.filter((f) => f.category == 2);
      this.allFru = this.food.filter((f) => f.category == 3);

      this.totalCals = this.food
        .reduce((a, b: any) => a + Number(b.amount || 0) * b.calories, 0)
        .toFixed(2);

      this.calInfo = calorieCounter(this.totalCals, this.type);
    });
    await modal.present();
  }

  save() {
    this.mealService
      .add({
        foods: JSON.stringify(this.food),
        calories: this.totalCals,
        type: this.type.toLowerCase(),
      })
      .subscribe((data) => {
        this.mealService.update();
        this.clear();
      });
  }

  change() {
    this.addMeal();
  }

  clear() {
    this.food = null;
    this.type = '';
    this.calInfo = null;
  }
}
