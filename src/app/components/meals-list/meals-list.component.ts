import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-meals-list',
  templateUrl: './meals-list.component.html',
  styleUrls: ['./meals-list.component.scss'],
})
export class MealsListComponent implements OnInit {
  segment = 'carbohydrate';
  constructor(public modalController: ModalController) {}

  ngOnInit() {}

  segmentChanged(e) {
    this.segment = e.detail.value;
  }
}
