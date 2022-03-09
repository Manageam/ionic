import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { CholesterolService } from 'src/app/services/cholesterol/cholesterol.service';
import dateFormat from 'dateformat';
import {
  fetchBloodPressureTips,
  fetchCholesterolTips,
} from 'src/assets/scripts/misc';
import { GlobalService } from 'src/app/services/global/global.service';
import { CalendarModalComponent } from '../calendar-modal/calendar-modal.component';
import { ShareEmailComponent } from '../share-email/share-email.component';
import { HealthService } from 'src/app/services/health/health.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-view-cholesterol',
  templateUrl: './view-cholesterol.component.html',
  styleUrls: ['./view-cholesterol.component.scss'],
})
export class ViewCholesterolComponent implements OnInit {
  expand = null;
  allCholesterol = [];
  subs = [];
  constructor(
    public modalController: ModalController,
    private cholesterolService: CholesterolService,
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

    sub = this.cholesterolService.cholesterol.subscribe((data) => {
      this.data = data;
    });

    this.subs.push(sub);
  }

  @Input() set data(data) {
    this.allCholesterol = data
      .sort(
        (a, z) =>
          new Date(z.created_at).getTime() - new Date(a.created_at).getTime()
      )
      .map((d) => {
        d.date = dateFormat(new Date(d.created_at), 'dd mmm, yyyy-hh:MMtt');
        d.tip = fetchCholesterolTips(d.unit, d.reading).tips;
        return d;
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
          .share({ email: data, ...date, type: 'body_mass' })
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

  toggle(i) {
    if (i == this.expand) {
      this.expand = null;
    } else {
      this.expand = i;
    }
  }
  async remove(id) {
    const { role } = <{ role }>await this.global.alert(
      'Remove Cholesterol reading.',
      'Are you sure you want to remove cholesterol reading?',
      [
        { role: false, text: 'Cancel' },
        { role: true, text: 'OK' },
      ]
    );

    if (!role) return;

    this.cholesterolService.remove(id).subscribe((data) => {
      this.allCholesterol = this.allCholesterol.filter((d) => d != id);
      this.webSocket.emit('cholesterol:update', {
        user_id: this.auth.loggedUser().id,
      });
    });
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
