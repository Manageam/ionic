import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-view-meal',
  templateUrl: './view-meal.component.html',
  styleUrls: ['./view-meal.component.scss'],
})
export class ViewMealComponent implements OnInit {
  meal: any = {};
  allCab = [];
  allPro = [];
  allFru = [];
  subs = [];
  constructor(
    public modalController: ModalController,
    private global: GlobalService,
    private platform: Platform
  ) {}
  @Input()
  set data(val) {
    this.meal = val;
    this.allCab = val.foods.filter((f) => f.category == 1);
    this.allPro = val.foods.filter((f) => f.category == 2);
    this.allFru = val.foods.filter((f) => f.category == 3);
  }
  ngOnInit() {
    let sub = this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
    this.subs.push(sub);
  }

  async remove() {
    const { role } = <{ role }>await this.global.alert(
      'Remove meal plan',
      'Are you sure you want to remove meal plan?',
      [
        { role: false, text: 'Cancel' },
        { role: true, text: 'OK' },
      ]
    );
    if (!role) return;
    return this.modalController.dismiss(this.meal);
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
