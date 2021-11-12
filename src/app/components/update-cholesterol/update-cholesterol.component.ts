import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-update-cholesterol',
  templateUrl: './update-cholesterol.component.html',
  styleUrls: ['./update-cholesterol.component.scss'],
})
export class UpdateCholesterolComponent implements OnInit {
  cholesterol = {
    unit: '',
    level: '',
  };
  tip = '';
  constructor(public modalController: ModalController) {}

  ngOnInit() {}
  save() {}
}
