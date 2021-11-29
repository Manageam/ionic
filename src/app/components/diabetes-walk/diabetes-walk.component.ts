import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { RegisterForWalkComponent } from '../register-for-walk/register-for-walk.component';

@Component({
  selector: 'app-diabetes-walk',
  templateUrl: './diabetes-walk.component.html',
  styleUrls: ['./diabetes-walk.component.scss'],
})
export class DiabetesWalkComponent implements OnInit {
  subs = [];
  constructor(
    public modalController: ModalController,
    private platform: Platform
  ) {}

  ngOnInit() {}
  async showRegistration() {
    const modal = await this.modalController.create({
      component: RegisterForWalkComponent,
      cssClass: 'modal-50',
    });
    modal.present();
    let sub = this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
    this.subs.push(sub);
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
