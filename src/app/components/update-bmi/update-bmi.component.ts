import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { BmiService } from 'src/app/services/bmi/bmi.service';
import { fetchBMI } from 'src/assets/scripts/misc';

@Component({
  selector: 'app-update-bmi',
  templateUrl: './update-bmi.component.html',
  styleUrls: ['./update-bmi.component.scss'],
})
export class UpdateBmiComponent implements OnInit {
  bmi = {
    unit: '',
    height: '',
    weight: '',
    mass: null,
  };
  tip = '';
  subs = [];
  constructor(
    public modalController: ModalController,
    private bmiService: BmiService,
    private platform: Platform
  ) {}

  ngOnInit() {
    let sub = this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
    this.subs.push(sub);
  }

  updateTip() {
    const unit = this.bmi.unit;
    const weight = Number(this.bmi.weight);
    const height = Number(this.bmi.height);

    if (unit === 'pounds/inch') {
      let calc = weight / Math.pow(height, 2);
      this.bmi.mass = calc * 703;
    } else this.bmi.mass = weight / Math.pow(height, 2);

    if (!this.bmi.unit || !this.bmi.height || !this.bmi.weight) {
      this.tip = '';
      return;
    }

    this.bmi.mass = this.bmi.mass.toFixed(2);
    this.tip = fetchBMI(this.bmi.mass);
  }

  save() {
    const data = Object.assign({}, this.bmi);
    delete data.height;
    delete data.weight;

    this.bmiService.add({ ...data, time: new Date() }).subscribe(() => {
      this.bmiService.update();
      this.modalController.dismiss();
    });
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
