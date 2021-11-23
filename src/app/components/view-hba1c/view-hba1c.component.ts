import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HealthService } from 'src/app/services/health/health.service';

@Component({
  selector: 'app-view-hba1c',
  templateUrl: './view-hba1c.component.html',
  styleUrls: ['./view-hba1c.component.scss'],
})
export class ViewHba1cComponent implements OnInit {
  segment = 'current';
  expand = null;
  color = 'gray';
  hba1c: { unit; number } = null;
  status = '';
  constructor(
    public modalController: ModalController,
    private healthService: HealthService
  ) {}

  ngOnInit() {
    this.fetchba1c();
  }
  share() {}
  segmentChanged(e) {
    this.segment = e.detail.value;
  }
  toggle(i) {
    if (i == this.expand) {
      this.expand = null;
    } else {
      this.expand = i;
    }
  }
  remove(i) {}
  fetchba1c() {
    this.hba1c = this.healthService.getHba1c().slice(-1)[0];
    if (
      (this.hba1c.unit == 'mmol/mol' && Number(this.hba1c.number) < 42) ||
      (this.hba1c.unit == 'percentage' && Number(this.hba1c.number) < 6)
    ) {
      this.color = 'green';
      this.status =
        'Your blood test shows that your A1C level is good. keep eating healthy. ';
    } else if (
      (this.hba1c.unit == 'mmol/mol' &&
        Number(this.hba1c.number) >= 42 &&
        Number(this.hba1c.number) <= 47) ||
      (this.hba1c.unit == 'percentage' &&
        Number(this.hba1c.number) >= 6 &&
        Number(this.hba1c.number) <= 6.4)
    ) {
      this.color = 'yellow';
      this.status =
        'Your blood test shows that you are at risk of developing Diabetes but not developed diabetes yet.';
    } else if (
      (this.hba1c.unit == 'mmol/mol' && Number(this.hba1c.number) >= 48) ||
      (this.hba1c.unit == 'percentage' && Number(this.hba1c.number) >= 6.5)
    ) {
      this.color = 'red';
      this.status =
        'Your blood test shows that your A1C level is of a Diabetic person. Eating habits and lifestyle changes are recommended.';
    }
  }
}
