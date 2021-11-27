import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  constructor(
    public modalController: ModalController,
    private global: GlobalService
  ) {}
  @Input()
  set data(val) {
    this.meal = val;
    this.allCab = val.foods.filter((f) => f.category == 1);
    this.allPro = val.foods.filter((f) => f.category == 2);
    this.allFru = val.foods.filter((f) => f.category == 3);
  }
  ngOnInit() {}

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
}
