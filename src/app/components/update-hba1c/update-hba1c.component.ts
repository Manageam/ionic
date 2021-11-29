import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { HealthService } from 'src/app/services/health/health.service';

@Component({
  selector: 'app-update-hba1c',
  templateUrl: './update-hba1c.component.html',
  styleUrls: ['./update-hba1c.component.scss'],
})
export class UpdateHba1cComponent implements OnInit {
  hba1c = {
    unit: '',
    number: '',
  };
  tip = '';
  subs = [];
  constructor(
    public modalController: ModalController,
    private healthService: HealthService,
    private platform: Platform
  ) {}
  updateTip() {
    if (this.hba1c.number == '') {
      this.tip = '';
    } else if (
      (this.hba1c.unit == 'mmol/mol' && Number(this.hba1c.number) < 42) ||
      (this.hba1c.unit == 'percentage' && Number(this.hba1c.number) < 6)
    ) {
      this.tip = `Good work`;
    } else if (
      (this.hba1c.unit == 'mmol/mol' &&
        Number(this.hba1c.number) >= 42 &&
        Number(this.hba1c.number) <= 47) ||
      (this.hba1c.unit == 'percentage' &&
        Number(this.hba1c.number) >= 6 &&
        Number(this.hba1c.number) <= 6.4)
    ) {
      this.tip = `<ul class="space-y-5 list-disc pl-4">
      <li>
      You blood test shows that you are at risk or developing Diabetes. But you have not developed diabetes yet.
      </li>
      <li>
      You must make changes in your eating habits and increase your physical activity to ensure that you don't develop diabetes in the future.
      </li>
      <li>
      Yearly checkup with you doctor is recommended.
      </li>
      </ul>`;
    } else if (
      (this.hba1c.unit == 'mmol/mol' && Number(this.hba1c.number) >= 48) ||
      (this.hba1c.unit == 'percentage' && Number(this.hba1c.number) >= 6.5)
    ) {
      this.tip = `
      <ul class="space-y-5 list-disc pl-4">
      <li>
      Your blood test shows that your A1C level is of a Diabetic person.
      </li>
      <li>
      Eating habits and lifestyle changes are recommended.
      </li>
      <li>
      See a doctor to see if you need a medication and please make sure you follow up.
      </li>
      <li>
      YOu must aim to bring down your A1C to less than 6.5%[48mmol/mol].
      </li>
      </ul>
      `;
    } else {
      this.tip = '';
    }
  }
  ngOnInit() {
    let sub = this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
  }
  save() {
    this.healthService.addHba1c(this.hba1c).subscribe((data) => {
      this.healthService.updateHba1c();
      this.modalController.dismiss();
    });
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
