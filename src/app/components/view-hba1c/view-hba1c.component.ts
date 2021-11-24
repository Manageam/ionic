import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HealthService } from 'src/app/services/health/health.service';
import dateFomart from 'dateformat';
import { fetchTip } from 'src/assets/scripts/misc';
import { GlobalService } from 'src/app/services/global/global.service';

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
  allHba1c = {};
  allHba1cKeys = [];
  status = '';
  constructor(
    public modalController: ModalController,
    private healthService: HealthService,
    private global: GlobalService
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

  async remove(id, key) {
    const { role } = <{ role }>await this.global.alert(
      'Remove Hba1c',
      'Are you sure you want to remove Hba1c reading?',
      [
        { role: false, text: 'Cancel' },
        { role: true, text: 'OK' },
      ]
    );
    if (role) {
      this.healthService.remove(id).subscribe(() => {
        this.allHba1c[key] = this.allHba1c[key].filter(
          (hba1c) => hba1c.id != id
        );
        this.healthService.updateHba1c();
      });
    }
  }

  fetchba1c() {
    this.healthService.getHba1c().subscribe((data) => {
      const allHba1c = data;
      this.hba1c = data.slice(-1)[0];

      // group the hba1c
      const hba1cGroups = {};
      this.formatStatus();

      for (let hba1c of allHba1c) {
        const key = dateFomart(new Date(hba1c.created_at), 'mmm-yyyy');
        hba1c.time = dateFomart(
          new Date(hba1c.created_at),
          'dd mmm, yyyy-hh:MMtt'
        );
        hba1c.tip = fetchTip(hba1c);
        if (hba1cGroups[key]) {
          hba1cGroups[key].push(hba1c);
        } else {
          hba1cGroups[key] = [hba1c];
        }
      }

      this.allHba1c = hba1cGroups;
      this.allHba1cKeys = Object.keys(hba1cGroups);
    });
  }

  formatStatus() {
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
