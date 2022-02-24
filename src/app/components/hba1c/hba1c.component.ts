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
      this.hba1c.unit =
        this.hba1c.unit in ['percentage', 'percent']
          ? 'percentage'
          : this.hba1c.unit;
      if (
        (this.hba1c.unit == 'mmol/mol' && this.hba1c.number < 20) ||
        (this.hba1c.unit == 'percentage' && this.hba1c.number < 4)
      ) {
        this.color = 'gray';
      } else if (
        (this.hba1c.unit == 'mmol/mol' &&
          this.hba1c.number >= 20 &&
          this.hba1c.number <= 38) ||
        (this.hba1c.unit == 'percentage' &&
          this.hba1c.number >= 4 &&
          this.hba1c.number <= 5.6)
      ) {
        this.color = 'green';
      } else if (
        (this.hba1c.unit == 'mmol/mol' &&
          this.hba1c.number >= 39 &&
          this.hba1c.number <= 46) ||
        (this.hba1c.unit == 'percentage' &&
          this.hba1c.number >= 5.7 &&
          this.hba1c.number <= 6.4)
      ) {
        this.color = 'orange';
      } else if (
        (this.hba1c.unit == 'mmol/mol' && this.hba1c.number >= 48) ||
        (this.hba1c.unit == 'percentage' && this.hba1c.number >= 6.5)
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
