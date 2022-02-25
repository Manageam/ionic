import { Component, OnInit } from '@angular/core';
import {
  ActionSheetController,
  ModalController,
  Platform,
} from '@ionic/angular';
import { MealService } from 'src/app/services/meal/meal.service';
import { calorieCounter } from 'src/assets/scripts/misc';
import { MealsListComponent } from '../meals-list/meals-list.component';
import { ViewMealComponent } from '../view-meal/view-meal.component';
import dateFormat from 'dateformat';
import { GlobalService } from 'src/app/services/global/global.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
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
  allMeals = [];
  subs = [];
  filter = '';
  filteredMeals = [];

  time = '';
  mealType = '';
  constructor(
    public modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private mealService: MealService,
    private platform: Platform,
    private global: GlobalService,
    private webSocket: WebsocketService,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    let sub = this.mealService.get().subscribe((data) => {
      this.allMeals = data.map((meal) => {
        meal.total = meal.foods.length;
        meal.date = dateFormat(new Date(meal.created_at), 'd, mmmm');
        meal.info = calorieCounter(meal.calories, meal.type);
        return meal;
      });
      this.filterMeals(this.filter);
    });

    this.filterMeals('');

    this.subs.push(sub);

    sub = this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
    this.subs.push(sub);

    sub = this.webSocket
      .listen('meals:update')
      .subscribe(({ user_id }: { user_id }) => {
        if (user_id != this.auth.loggedUser().id) return;
        this.mealService.update();
      });
    this.subs.push(sub);

    sub = this.webSocket
      .listen('meals:delete')
      .subscribe(({ user_id, id }: { user_id; id }) => {
        if (user_id != this.auth.loggedUser().id) return;
        this.allMeals = this.allMeals.filter((meal) => meal.id != id);
        this.filterMeals(this.filter);
      });
    this.subs.push(sub);

    let today = new Date();
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const curHr = today.getHours();
    this.time = today.getDate() + ', ' + months[today.getMonth()];

    if (curHr < 12) {
      this.mealType = 'Breakfast';
    } else if (curHr < 16) {
      this.mealType = 'Lunch';
    } else {
      this.mealType = 'Dinner';
    }
  }

  segmentChanged(e) {
    this.segment = e.detail.value;
    this.filterMeals('');
  }

  async showMeal(meal) {
    const modal = await this.modalController.create({
      component: ViewMealComponent,
      componentProps: { data: meal },
    });

    modal.onDidDismiss().then(({ data }) => {
      if (!data) return;
      this.mealService.remove(data.id).subscribe((d) => {
        this.allMeals = this.allMeals.filter((meal) => meal.id != data.id);
        this.filterMeals(this.filter);
        this.webSocket.emit('meals:delete', {
          user_id: this.auth.loggedUser().id,
          id: data.id,
        });
        this.mealService.update();
      });
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
    const modal = await this.modalController.create({
      component: MealsListComponent,
      componentProps: {
        type: this.type,
        data: this.food || [],
      },
    });
    modal.onDidDismiss().then(({ data }: { data }) => {
      if (!data || (data && data.length == 0)) {
        this.type = '';
        return;
      }
      this.food = data;
      this.allCab = this.food.filter((f) => f.category == 1);
      this.allFru = this.food.filter((f) => f.category == 2);
      this.allPro = this.food.filter((f) => f.category == 3);

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
        this.webSocket.emit('meals:update', {
          user_id: this.auth.loggedUser().id,
        });
        this.global.alert('Meal Plan', 'Meal plan successfully saved', ['OK']);
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
    this.totalCals = 0;
  }

  filterMeals(meal) {
    this.filter = meal;
    const q = new RegExp(meal);
    this.filteredMeals = this.allMeals.filter((m) =>
      q.test(m.type.toLowerCase())
    );
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
