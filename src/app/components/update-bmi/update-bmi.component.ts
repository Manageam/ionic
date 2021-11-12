import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-update-bmi',
  templateUrl: './update-bmi.component.html',
  styleUrls: ['./update-bmi.component.scss'],
})
export class UpdateBmiComponent implements OnInit {
  bmi = {
    unit: '',
    hieght: '',
    weight: '',
    bmi: '',
  };
  constructor(public modalController: ModalController) {}

  ngOnInit() {}
  save() {}
}
