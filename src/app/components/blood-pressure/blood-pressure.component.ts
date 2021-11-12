import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UpdateBloodPressureComponent } from '../update-blood-pressure/update-blood-pressure.component';
import { ViewBloodPressureComponent } from '../view-blood-pressure/view-blood-pressure.component';

@Component({
  selector: 'app-blood-pressure',
  templateUrl: './blood-pressure.component.html',
  styleUrls: ['./blood-pressure.component.scss'],
})
export class BloodPressureComponent implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}
  async view() {
    const modal = await this.modalController.create({
      component: ViewBloodPressureComponent,
    });
    modal.present();
  }

  async record(e = null) {
    e?.stopPropagation();
    const modal = await this.modalController.create({
      component: UpdateBloodPressureComponent,
      cssClass: 'modal-50',
    });
    await modal.present();
  }
}
