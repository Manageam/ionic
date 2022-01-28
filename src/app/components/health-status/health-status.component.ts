import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HealthService } from 'src/app/services/health/health.service';
import { checkHealthStatus } from 'src/assets/scripts/misc';
import { UpdateHealthStatusComponent } from '../update-health-status/update-health-status.component';
import { ViewHealthStatusComponent } from '../view-health-status/view-health-status.component';

@Component({
  selector: 'app-health-status',
  templateUrl: './health-status.component.html',
  styleUrls: ['./health-status.component.scss'],
})
export class HealthStatusComponent implements OnInit {
  subs = [];
  healthStatus: any = {};
  constructor(
    private modalController: ModalController,
    private healthService: HealthService
  ) {}

  ngOnInit() {
    let sub = this.healthService.getHealth().subscribe((data) => {
      this.healthStatus = data;
      console.log(data);
      // this.healthStatus.name = checkHealthStatus(data.diabetics);
    });

    this.subs.push(sub);
  }
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
      componentProps: { value: this.healthStatus.diabetics },
      cssClass: 'modal-60',
    });
    await modal.present();
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
