import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
    hieght: '',
    weight: '',
    mass: '',
  };
  tip = '';
  subs = [];
  constructor(
    public modalController: ModalController,
    private bmiService: BmiService
  ) {}

  ngOnInit() {}

  updateTip() {
    this.bmi.mass = String(Number(this.bmi.weight) / Number(this.bmi.hieght));
    if (!this.bmi.unit || !this.bmi.hieght || !this.bmi.weight) {
      this.tip = '';
      return;
    }
    this.tip = fetchBMI(this.bmi.mass);
  }

  save() {
    const data = Object.assign({}, this.bmi);
    delete data.hieght;
    delete data.weight;

    this.bmiService.add({ ...data, time: new Date() }).subscribe(() => {
      this.bmiService.update();
      this.modalController.dismiss();
    });
  }
}
