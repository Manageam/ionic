import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { HealthService } from 'src/app/services/health/health.service';
import dateFormat from 'dateformat';
import { fetchTip } from 'src/assets/scripts/misc';
import { GlobalService } from 'src/app/services/global/global.service';
import { CalendarModalComponent } from '../calendar-modal/calendar-modal.component';
import { ShareEmailComponent } from '../share-email/share-email.component';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-view-hba1c',
  templateUrl: './view-hba1c.component.html',
  styleUrls: ['./view-hba1c.component.scss'],
})
export class ViewHba1cComponent implements OnInit {
  segment = 'current';
  expand = null;
  color = 'gray';
  hba1c: { unit; number; date } = null;
  allHba1c = {};
  allHba1cKeys = [];
  status = '';
  subs = [];
  constructor(
    public modalController: ModalController,
    private healthService: HealthService,
    private global: GlobalService,
    private platform: Platform,
    private webSocket: WebsocketService,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    let sub = this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
    this.subs.push(sub);

    sub = this.healthService.getHba1c().subscribe((data) => {
      this.data = data;
    });

    this.subs.push(sub);
  }

  @Input() set data(data) {
    const allHba1c = data;
    if (data.length == 0) return;
    this.hba1c = data.slice(-1)[0];
    // group the hba1c
    const hba1cGroups = {};
    const d = fetchTip(this.hba1c);
    this.status = d.status;
    this.color = d.color;

    for (let hba1c of allHba1c) {
      const key = dateFormat(new Date(hba1c.created_at), 'mmm-yyyy');
      hba1c.time = dateFormat(
        new Date(hba1c.created_at),
        'dd mmm, yyyy-hh:MMtt'
      );
      hba1c.tip = fetchTip(hba1c).tip;
      if (hba1cGroups[key]) {
        hba1cGroups[key].push(hba1c);
      } else {
        hba1cGroups[key] = [hba1c];
      }
    }

    //sort

    for (const key in hba1cGroups) {
      hba1cGroups[key] = hba1cGroups[key].sort(
        (a, z) =>
          new Date(z.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }

    this.allHba1c = hba1cGroups;
    this.allHba1cKeys = Object.keys(hba1cGroups).sort(
      (a, z) => new Date(z).getTime() - new Date(a).getTime()
    );
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
          .share({ email: data, ...date, type: 'hba1c' })
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
        this.webSocket.emit('hba1c:update', {
          user_id: this.auth.loggedUser().id,
        });
      });
    }
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
