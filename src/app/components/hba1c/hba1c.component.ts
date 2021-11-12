import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UpdateHba1cComponent } from '../update-hba1c/update-hba1c.component';
import { ViewHba1cComponent } from '../view-hba1c/view-hba1c.component';

@Component({
  selector: 'app-hba1c',
  templateUrl: './hba1c.component.html',
  styleUrls: ['./hba1c.component.scss'],
})
export class Hba1cComponent implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.view();
  }

  async view() {
    const modal = await this.modalController.create({
      component: ViewHba1cComponent,
    });
    modal.present();
  }

  async record(e = null) {
    e?.stopPropagation();
    const modal = await this.modalController.create({
      component: UpdateHba1cComponent,
      cssClass: 'modal-50',
    });
    await modal.present();
  }
}
