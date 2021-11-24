import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BloodSugarService } from 'src/app/services/blood-sugar/blood-sugar.service';
import dateFormat from 'dateformat';
import { fetchBloodSugarTips } from 'src/assets/scripts/misc';
import { GlobalService } from 'src/app/services/global/global.service';
@Component({
  selector: 'app-view-blood-sugar',
  templateUrl: './view-blood-sugar.component.html',
  styleUrls: ['./view-blood-sugar.component.scss'],
})
export class ViewBloodSugarComponent implements OnInit {
  expand = null;
  bloodSugar = [];
  subs = [];
  constructor(
    public modalController: ModalController,
    private bloodSugarService: BloodSugarService,
    private global: GlobalService
  ) {}

  ngOnInit() {
    let sub = this.bloodSugarService.get().subscribe((data) => {
      this.bloodSugar = data.map((datum) => {
        datum.date = dateFormat(
          new Date(datum.created_at),
          'dd mmm, yyyy-hh:MMtt'
        );
        datum.tip = fetchBloodSugarTips({
          ...datum,
          value: datum.reading,
        });
        return datum;
      });
      console.log(this.bloodSugar);
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
      'Remove Blood Sugar',
      'Are you sure you want to remove blood sugar reading?',
      [
        { role: false, text: 'Cancel' },
        { role: true, text: 'OK' },
      ]
    );
    if (role) {
      this.bloodSugarService.remove(id).subscribe(() => {
        this.bloodSugar = this.bloodSugar.filter((s) => s.id != id);
        this.bloodSugarService.update();
      });
    }
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
