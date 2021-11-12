import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-update-blood-pressure',
  templateUrl: './update-blood-pressure.component.html',
  styleUrls: ['./update-blood-pressure.component.scss'],
})
export class UpdateBloodPressureComponent implements OnInit {
  pressure = {
    systolic: '',
    diastolic: '',
  };
  tip = '';
  constructor(public modalController: ModalController) {}

  ngOnInit() {}
  save() {}
}
