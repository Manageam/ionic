import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { HealthService } from 'src/app/services/health/health.service';
import { checkHealthStatus } from 'src/assets/scripts/misc';
import dateFormat from 'dateformat';

@Component({
  selector: 'app-view-health-status',
  templateUrl: './view-health-status.component.html',
  styleUrls: ['./view-health-status.component.scss'],
})
export class ViewHealthStatusComponent implements OnInit {
  healthStatus: any = {};
  subs = [];
  constructor(
    public modalController: ModalController,
    private healthService: HealthService,
    private platform: Platform
  ) {}

  ngOnInit() {
    let sub = this.healthService.getHealth().subscribe((data) => {
      this.healthStatus = data;
      if (data) {
        this.healthStatus.name = checkHealthStatus(data.diabetics);
        this.healthStatus.date = dateFormat(
          new Date(data.created_at),
          'dd mmm, yyyy-hh:MMtt'
        );
      }
    });

    this.subs.push(sub);

    sub = this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
    this.subs.push(sub);
  }
  update() {
    this.modalController.dismiss(true);
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
