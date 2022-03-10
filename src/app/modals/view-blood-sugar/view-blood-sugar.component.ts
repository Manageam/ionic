import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { BloodSugarService } from 'src/app/services/blood-sugar/blood-sugar.service';
import dateFormat from 'dateformat';
import { fetchBloodSugarTips } from 'src/assets/scripts/misc';
import { GlobalService } from 'src/app/services/global/global.service';
import { CalendarModalComponent } from '../calendar-modal/calendar-modal.component';
import { ShareEmailComponent } from '../share-email/share-email.component';
import { HealthService } from 'src/app/services/health/health.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
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
    this.bloodSugarService.allBloodSugar.subscribe((data) => {
      this.data = data;
    });
    this.subs.push(sub);
  }

  @Input() set data(data) {
    this.bloodSugar = data
      .sort(
        (a, z) =>
          new Date(z.created_at).getTime() - new Date(a.created_at).getTime()
      )
      .map((datum) => {
        datum.date = dateFormat(
          new Date(datum.created_at),
          'dd mmm, yyyy-hh:MMtt'
        );
        datum.tip = fetchBloodSugarTips({
          ...datum,
          value: datum.reading,
        }).tips;
        return datum;
      });
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
            return this.global.alert('Shared Record', data, [
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
        this.webSocket.emit('blood-sugar:update', {
          user_id: this.auth.loggedUser().id,
        });
      });
    }
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
