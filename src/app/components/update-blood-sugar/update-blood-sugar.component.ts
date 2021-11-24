import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BloodSugarService } from 'src/app/services/blood-sugar/blood-sugar.service';
import { fetchBloodSugarTips } from 'src/assets/scripts/misc';

@Component({
  selector: 'app-update-blood-sugar',
  templateUrl: './update-blood-sugar.component.html',
  styleUrls: ['./update-blood-sugar.component.scss'],
})
export class UpdateBloodSugarComponent implements OnInit {
  bloodSugar = {
    unit: '',
    reading_time: '',
    reading: '',
  };
  tip = '';
  constructor(
    public modalController: ModalController,
    private bloodSugarService: BloodSugarService
  ) {}

  ngOnInit() {}
  updateTip() {
    if (
      this.bloodSugar.unit == '' ||
      this.bloodSugar.reading_time == '' ||
      this.bloodSugar.reading == ''
    ) {
      this.tip = '';
      return;
    }
    this.tip = fetchBloodSugarTips({
      ...this.bloodSugar,
      value: this.bloodSugar.reading,
    });
  }

  save() {
    this.bloodSugarService
      .add({ ...this.bloodSugar, time: new Date() })
      .subscribe((data) => {
        console.log(data);
        this.bloodSugarService.update();
        this.modalController.dismiss();
      });
  }
}
