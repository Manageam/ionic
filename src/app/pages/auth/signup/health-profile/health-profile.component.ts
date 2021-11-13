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
    this.modalController.dismiss(this.profile);
  }
}
