import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HealthService } from 'src/app/services/health/health.service';
import { UpdateHba1cComponent } from '../update-hba1c/update-hba1c.component';
import { ViewHba1cComponent } from '../view-hba1c/view-hba1c.component';

@Component({
  selector: 'app-hba1c',
  templateUrl: './hba1c.component.html',
  styleUrls: ['./hba1c.component.scss'],
})
export class Hba1cComponent implements OnInit {
  hba1c: { number; unit } = null;
  color = 'green';
  animation = null;
  status = '';
  constructor(
    private modalController: ModalController,
    private healthService: HealthService
  ) {}

  ngOnInit() {
    this.fetchba1c();
    this.view();
  }

  fetchba1c() {
    this.hba1c = this.healthService.getHba1c().slice(-1)[0];
    if (
      (this.hba1c.unit == 'mmol/mol' && Number(this.hba1c.number) < 42) ||
      (this.hba1c.unit == 'percentage' && Number(this.hba1c.number) < 6)
    ) {
      this.color = 'green';
    } else if (
      (this.hba1c.unit == 'mmol/mol' &&
        Number(this.hba1c.number) >= 42 &&
        Number(this.hba1c.number) <= 47) ||
      (this.hba1c.unit == 'percentage' &&
        Number(this.hba1c.number) >= 6 &&
        Number(this.hba1c.number) <= 6.4)
    ) {
      this.color = 'orange';
    } else if (
      (this.hba1c.unit == 'mmol/mol' && Number(this.hba1c.number) >= 48) ||
      (this.hba1c.unit == 'percentage' && Number(this.hba1c.number) >= 6.5)
    ) {
      this.color = 'red';
    }
    this.animation = requestAnimationFrame(() => this.fetchba1c());
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

  ngOnDestroy() {
    cancelAnimationFrame(this.animation);
  }
}
