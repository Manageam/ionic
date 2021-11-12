import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UpdateCholesterolComponent } from '../update-cholesterol/update-cholesterol.component';
import { ViewCholesterolComponent } from '../view-cholesterol/view-cholesterol.component';

@Component({
  selector: 'app-cholesterol',
  templateUrl: './cholesterol.component.html',
  styleUrls: ['./cholesterol.component.scss'],
})
export class CholesterolComponent implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}
  async view() {
    const modal = await this.modalController.create({
      component: ViewCholesterolComponent,
    });
    modal.present();
  }

  async record(e = null) {
    e?.stopPropagation();
    const modal = await this.modalController.create({
      component: UpdateCholesterolComponent,
      cssClass: 'modal-50',
    });
    await modal.present();
  }
}
