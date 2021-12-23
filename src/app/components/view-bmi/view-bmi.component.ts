import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { BmiService } from 'src/app/services/bmi/bmi.service';
import dateFormat from 'dateformat';
import { fetchBMI } from 'src/assets/scripts/misc';
import { GlobalService } from 'src/app/services/global/global.service';
import { CalendarModalComponent } from '../calendar-modal/calendar-modal.component';
import { ShareEmailComponent } from '../share-email/share-email.component';
import { HealthService } from 'src/app/services/health/health.service';

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
    private platform: Platform,
    private healthService: HealthService
  ) {}

  ngOnInit() {
    let sub = this.bmiService.get().subscribe((data) => {
      this.allBmi = data
        .sort(
          (a, z) =>
            new Date(z.created_at).getTime() - new Date(a.created_at).getTime()
        )
        .map((datum) => {
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

  async share() {
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: CalendarModalComponent,
      cssClass: 'modal-80',
    });

    modal.onDidDismiss().then(async ({ data }) => {
      if (!data) return;
      const modal = await this.modalController.create({
        component: ShareEmailComponent,
        cssClass: 'modal-50',
      });
      const date = data;
      modal.onDidDismiss().then(({ data }) => {
        if (!data) return;
        this.healthService
          .share({ email: data, ...date, type: 'blood_sugar' })
          .subscribe((data: string) => {
            return this.global.alert('Share record', data, [
              { role: true, text: 'OK' },
            ]);
          });
      });
      await modal.present();
    });

    await modal.present();
  }

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
