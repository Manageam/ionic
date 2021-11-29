import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { HealthService } from 'src/app/services/health/health.service';

@Component({
  selector: 'app-update-health-status',
  templateUrl: './update-health-status.component.html',
  styleUrls: ['./update-health-status.component.scss'],
})
export class UpdateHealthStatusComponent implements OnInit {
  @Input() value = '';
  subs = [];
  constructor(
    public modalController: ModalController,
    private healthService: HealthService,
    private platform: Platform
  ) {}

  ngOnInit() {
    let sub = this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
    this.subs.push(sub);
  }

  save() {
    this.healthService.addHealth(this.value).subscribe((data) => {
      this.healthService.updateHealth();
      this.modalController.dismiss();
    });
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
