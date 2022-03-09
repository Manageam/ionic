import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { BloodPressureService } from 'src/app/services/blood-pressure/blood-pressure.service';
import dateFormat from 'dateformat';
import { fetchBloodPressureTips } from 'src/assets/scripts/misc';
import { GlobalService } from 'src/app/services/global/global.service';
import { CalendarModalComponent } from '../calendar-modal/calendar-modal.component';
import { ShareEmailComponent } from '../share-email/share-email.component';
import { HealthService } from 'src/app/services/health/health.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

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
    private platform: Platform,
    private healthService: HealthService,
    private webSocket: WebsocketService,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    let sub = this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
    this.subs.push(sub);

    sub = this.bloodPressureService.allBloodPressure.subscribe((data) => {
      this.data = data;
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
          .share({ email: data, ...date, type: 'blood_pressure' })
          .subscribe((data: string) => {
            return this.global.alert('Shared record', data, [
              { role: true, text: 'OK' },
            ]);
          });
      });
      await modal.present();
    });

    await modal.present();
  }

  @Input() set data(data) {
    this.allBloodPressure = data
      .sort(
        (a, z) =>
          new Date(z.created_at).getTime() - new Date(a.created_at).getTime()
      )
      .map((datum) => {
        datum.date = dateFormat(
          new Date(datum.created_at),
          'dd mmm, yyyy-hh:MMtt'
        );
        datum.tip = fetchBloodPressureTips(datum.upper, datum.lower).tips;
        return datum;
      });
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
      'Remove Blood Pressure',
      'Are you sure you want to remove blood pressure reading?',
      [
        { role: false, text: 'Cancel' },
        { role: true, text: 'OK' },
      ]
    );
    if (!role) return;
    this.bloodPressureService.remove(id).subscribe((data) => {
      this.allBloodPressure = this.allBloodPressure.filter((b) => b.id != id);
      this.webSocket.emit('blood-pressure:update', {
        user_id: this.auth.loggedUser().id,
      });
    });
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
