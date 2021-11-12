import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-update-blood-sugar',
  templateUrl: './update-blood-sugar.component.html',
  styleUrls: ['./update-blood-sugar.component.scss'],
})
export class UpdateBloodSugarComponent implements OnInit {
  bloodSugar = {
    unit: '',
    time: '',
    reading: '',
  };
  tip = '';
  constructor(public modalController: ModalController) {}

  ngOnInit() {}
  save() {}
}
