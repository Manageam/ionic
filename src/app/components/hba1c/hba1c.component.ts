import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { HealthService } from 'src/app/services/health/health.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { UpdateHba1cComponent } from '../update-hba1c/update-hba1c.component';
import { ViewHba1cComponent } from '../view-hba1c/view-hba1c.component';

@Component({
  selector: 'app-hba1c',
  templateUrl: './hba1c.component.html',
  styleUrls: ['./hba1c.component.scss'],
})
export class Hba1cComponent implements OnInit {
  hba1c: { number; unit } = null;
  color = 'green';
  animation = null;
  status = '';
  allHba1c = [];
  subs = [];
  constructor(
    private modalController: ModalController,
    private healthService: HealthService,
    private webSocket: WebsocketService,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    this.fetchba1c();
    let sub = this.webSocket
      .listen('hba1c:update')
      .subscribe(({ user_id }: { user_id }) => {
        if (user_id != this.auth.loggedUser().id) return;
        this.healthService.updateHba1c();
      });
    this.subs.push(sub);
  }

  fetchba1c() {
    this.healthService.getHba1c().subscribe((data) => {
      this.allHba1c = data;
      this.hba1c = data.slice(-1)[0];
      if (!this.hba1c) return;
      this.hba1c.number = Number(this.hba1c.number).toFixed(2);
      if (
        (this.hba1c.unit == 'mmol/mol' && Number(this.hba1c.number) < 42) ||
        (this.hba1c.unit == 'percentage' && Number(this.hba1c.number) < 6)
      ) {
        this.color = 'green';
      } else if (
        (this.hba1c.unit == 'mmol/mol' &&
          Number(this.hba1c.number) >= 42 &&
          Number(this.hba1c.number) <= 47) ||
        (this.hba1c.unit == 'percentage' &&
          Number(this.hba1c.number) >= 6 &&
          Number(this.hba1c.number) <= 6.4)
      ) {
        this.color = 'orange';
      } else if (
        (this.hba1c.unit == 'mmol/mol' && Number(this.hba1c.number) >= 48) ||
        (this.hba1c.unit == 'percentage' && Number(this.hba1c.number) >= 6.5)
      ) {
        this.color = 'red';
      }
    });
  }

  async view() {
    const modal = await this.modalController.create({
      component: ViewHba1cComponent,
      componentProps: {
        data: this.allHba1c,
      },
    });
    modal.present();
  }

  async record(e = null) {
    e?.stopPropagation();
    const modal = await this.modalController.create({
      component: UpdateHba1cComponent,
      cssClass: 'modal-80',
    });
    await modal.present();
  }

  ngOndestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
