import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { BmiService } from 'src/app/services/bmi/bmi.service';
import dateFormat from 'dateformat';
import { fetchBMI } from 'src/assets/scripts/misc';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-view-bmi',
  templateUrl: './view-bmi.component.html',
  styleUrls: ['./view-bmi.component.scss'],
})
export class ViewBmiComponent implements OnInit {
  expand = null;
  subs = [];
  allBmi = [];
  constructor(
    public modalController: ModalController,
    private bmiService: BmiService,
    private global: GlobalService,
    private platform: Platform
  ) {}

  ngOnInit() {
    let sub = this.bmiService.get().subscribe((data) => {
      this.allBmi = data.map((datum) => {
        datum.date = dateFormat(
          new Date(datum.created_at),
          'dd mmm, yyyy-hh:MMtt'
        );
        datum.tip = fetchBMI(datum.mass);
        return datum;
      });
    });

    this.subs.push(sub);

    sub = this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
    this.subs.push(sub);
  }
  share() {}
  toggle(i) {
    if (i == this.expand) {
      this.expand = null;
    } else {
      this.expand = i;
    }
  }
  async remove(id) {
    const { role } = <{ role }>await this.global.alert(
      'Remove BMI',
      'Are you sure you want to remove BMI reading?',
      [
        { role: false, text: 'Cancel' },
        { role: true, text: 'OK' },
      ]
    );
    if (!role) return;
    this.bmiService.remove(id).subscribe((data) => {
      console.log(data);
      this.allBmi = this.allBmi.filter((b) => b.id != id);
      this.bmiService.update();
    });
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
