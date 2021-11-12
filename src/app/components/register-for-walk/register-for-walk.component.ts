import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-register-for-walk',
  templateUrl: './register-for-walk.component.html',
  styleUrls: ['./register-for-walk.component.scss'],
})
export class RegisterForWalkComponent implements OnInit {
  walk: any = {};
  constructor(public modalController: ModalController) {}

  ngOnInit() {}
  save() {
    console.log('save');
  }
}
