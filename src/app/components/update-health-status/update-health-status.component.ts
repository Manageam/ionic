import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HealthService } from 'src/app/services/health/health.service';

@Component({
  selector: 'app-update-health-status',
  templateUrl: './update-health-status.component.html',
  styleUrls: ['./update-health-status.component.scss'],
})
export class UpdateHealthStatusComponent implements OnInit {
  @Input() value = '';
  constructor(
    public modalController: ModalController,
    private healthService: HealthService
  ) {}

  ngOnInit() {}

  save() {
    this.healthService.addHealth(this.value).subscribe((data) => {
      this.healthService.updateHealth();
      this.modalController.dismiss();
    });
  }
}
