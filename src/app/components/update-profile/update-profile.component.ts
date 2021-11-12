import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent implements OnInit {
  profile = {
    age: '',
    height: '',
    weight: '',
    phone: '',
    name: '',
    unit: '',
    gender: '',
  };
  constructor(public modalController: ModalController) {}

  ngOnInit() {}
  save() {}
}
