import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UpdateHealthStatusComponent } from '../update-health-status/update-health-status.component';
import { ViewHealthStatusComponent } from '../view-health-status/view-health-status.component';

@Component({
  selector: 'app-health-status',
  templateUrl: './health-status.component.html',
  styleUrls: ['./health-status.component.scss'],
})
export class HealthStatusComponent implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}
  async view() {
    const modal = await this.modalController.create({
      component: ViewHealthStatusComponent,
    });
    modal.onDidDismiss().then((res) => {
      const { data } = res;
      if (data) this.change(null);
    });
    modal.present();
  }

  async change(e) {
    e?.stopPropagation();
    const modal = await this.modalController.create({
      component: UpdateHealthStatusComponent,
      cssClass: 'modal-60',
    });
    await modal.present();
  }
}
