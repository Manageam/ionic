import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { HealthService } from 'src/app/services/health/health.service';
import { checkHealthStatus } from 'src/assets/scripts/misc';
import dateFormat from 'dateformat';
import { Router } from '@angular/router';

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
    private platform: Platform,
    public router: Router
  ) {}

  ngOnInit() {
    let sub = this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
    this.subs.push(sub);
  }

  @Input() set status(stat) {
    this.healthStatus = stat;
    if (stat) {
      this.healthStatus.name = checkHealthStatus(stat.diabetics);
      this.healthStatus.date = this.healthStatus.name
        ? dateFormat(new Date(stat.created_at), 'dd mmm, yyyy-hh:MMtt')
        : '';
    }
  }
  update() {
    this.modalController.dismiss(true);
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
