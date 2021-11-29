import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { BloodPressureService } from 'src/app/services/blood-pressure/blood-pressure.service';
import { fetchBloodPressureTips } from 'src/assets/scripts/misc';

@Component({
  selector: 'app-update-blood-pressure',
  templateUrl: './update-blood-pressure.component.html',
  styleUrls: ['./update-blood-pressure.component.scss'],
})
export class UpdateBloodPressureComponent implements OnInit {
  pressure = {
    upper: '',
    lower: '',
  };
  tip = '';
  subs = [];
  constructor(
    public modalController: ModalController,
    private bloodPressureService: BloodPressureService,
    private platform: Platform
  ) {}

  ngOnInit() {
    let sub = this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
    this.subs.push(sub);
  }

  updateTip() {
    if (this.pressure.upper == '' || this.pressure.lower == '') {
      this.tip = '';
      return;
    }

    this.tip = fetchBloodPressureTips(this.pressure.upper, this.pressure.lower);
  }

  save() {
    this.bloodPressureService
      .add({ time: new Date(), ...this.pressure, unit: 'mmhg' })
      .subscribe((data) => {
        console.log(data);
        this.modalController.dismiss();
        this.bloodPressureService.update();
      });
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
