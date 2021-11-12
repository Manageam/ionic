import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UpdateBloodSugarComponent } from '../update-blood-sugar/update-blood-sugar.component';
import { ViewBloodSugarComponent } from '../view-blood-sugar/view-blood-sugar.component';

@Component({
  selector: 'app-blood-sugar',
  templateUrl: './blood-sugar.component.html',
  styleUrls: ['./blood-sugar.component.scss'],
})
export class BloodSugarComponent implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async view() {
    const modal = await this.modalController.create({
      component: ViewBloodSugarComponent,
    });
    modal.present();
  }

  async record(e = null) {
    e?.stopPropagation();
    const modal = await this.modalController.create({
      component: UpdateBloodSugarComponent,
      cssClass: 'modal-50',
    });
    await modal.present();
  }
}
