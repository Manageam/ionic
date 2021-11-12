import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UpdateBmiComponent } from '../update-bmi/update-bmi.component';
import { ViewBmiComponent } from '../view-bmi/view-bmi.component';

@Component({
  selector: 'app-bmi',
  templateUrl: './bmi.component.html',
  styleUrls: ['./bmi.component.scss'],
})
export class BmiComponent implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}
  async view() {
    const modal = await this.modalController.create({
      component: ViewBmiComponent,
    });
    modal.present();
  }

  async record(e = null) {
    e?.stopPropagation();
    const modal = await this.modalController.create({
      component: UpdateBmiComponent,
      cssClass: 'modal-50',
    });
    await modal.present();
  }
}
