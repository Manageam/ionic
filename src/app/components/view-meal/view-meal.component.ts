import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-view-meal',
  templateUrl: './view-meal.component.html',
  styleUrls: ['./view-meal.component.scss'],
})
export class ViewMealComponent implements OnInit {
  constructor(public modalController: ModalController) {}

  ngOnInit() {}
}
