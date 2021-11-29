import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { BloodPressureService } from 'src/app/services/blood-pressure/blood-pressure.service';
import dateFormat from 'dateformat';
import { fetchBloodPressureTips } from 'src/assets/scripts/misc';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-view-blood-pressure',
  templateUrl: './view-blood-pressure.component.html',
  styleUrls: ['./view-blood-pressure.component.scss'],
})
export class ViewBloodPressureComponent implements OnInit {
  expand = null;
  allBloodPressure = [];
  subs = [];
  constructor(
    public modalController: ModalController,
    private bloodPressureService: BloodPressureService,
    private global: GlobalService,
    private platform: Platform
  ) {}

  ngOnInit() {
    let sub = this.bloodPressureService.get().subscribe((data) => {
      this.allBloodPressure = data.map((datum) => {
        datum.date = dateFormat(
          new Date(datum.created_at),
          'dd mmm, yyyy-hh:MMtt'
        );
        datum.tip = fetchBloodPressureTips(datum.upper, datum.lower);
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
      'Remove Blood Pressure',
      'Are you sure you want to remove blood pressure reading?',
      [
        { role: false, text: 'Cancel' },
        { role: true, text: 'OK' },
      ]
    );
    if (!role) return;
    this.bloodPressureService.remove(id).subscribe((data) => {
      console.log(data);
      this.allBloodPressure = this.allBloodPressure.filter((b) => b.id != id);
      this.bloodPressureService.update();
    });
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
