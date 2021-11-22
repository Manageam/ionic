import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-health-profile',
  templateUrl: './health-profile.component.html',
  styleUrls: ['./health-profile.component.scss'],
})
export class HealthProfileComponent implements OnInit {
  profile = {
    height: '',
    weight: '',
    age: '',
    gender: '',
  };
  constructor(public modalController: ModalController) {}

  ngOnInit() {}

  save() {
    const data = {};
    for (let key in this.profile) {
      if (this.profile[key]) data[key] = this.profile[key];
    }
    this.modalController.dismiss(data);
  }
}
