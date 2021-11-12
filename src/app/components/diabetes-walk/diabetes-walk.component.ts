import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RegisterForWalkComponent } from '../register-for-walk/register-for-walk.component';

@Component({
  selector: 'app-diabetes-walk',
  templateUrl: './diabetes-walk.component.html',
  styleUrls: ['./diabetes-walk.component.scss'],
})
export class DiabetesWalkComponent implements OnInit {
  constructor(public modalController: ModalController) {}

  ngOnInit() {}
  async showRegistration() {
    const modal = await this.modalController.create({
      component: RegisterForWalkComponent,
      cssClass: 'modal-50',
    });
    modal.present();
  }
}
