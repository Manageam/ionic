import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { BloodSugarService } from 'src/app/services/blood-sugar/blood-sugar.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { UpdateBloodSugarComponent } from '../update-blood-sugar/update-blood-sugar.component';
import { ViewBloodSugarComponent } from '../view-blood-sugar/view-blood-sugar.component';

@Component({
  selector: 'app-blood-sugar',
  templateUrl: './blood-sugar.component.html',
  styleUrls: ['./blood-sugar.component.scss'],
})
export class BloodSugarComponent implements OnInit {
  bloodSugar: any = null;
  color = 'gray';
  allBloodSugar = [];
  subs = [];
  constructor(
    private modalController: ModalController,
    private bloodSugarService: BloodSugarService,
    private webSocket: WebsocketService,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    this.fetch();
    let sub = this.webSocket
      .listen('blood-sugar:update')
      .subscribe(({ user_id }: { user_id }) => {
        if (user_id != this.auth.loggedUser().id) return;
        this.bloodSugarService.update();
      });
    this.subs.push(sub);
  }

  fetch() {
    this.bloodSugarService.get().subscribe((data) => {
      this.allBloodSugar = data;
      this.bloodSugar = data.slice(-1)[0];
      this.color = this.bloodSugar
        ? this.updateSugarColor(
            this.bloodSugar.unit,
            this.bloodSugar.reading,
            this.bloodSugar.time
          )
        : 'gray';
    });
  }

  updateSugarColor(unit, value, time) {
    if (unit === 'mmol/L') {
      if (time === 'after') {
        switch (true) {
          case value != 0:
            return 'white';
          case value < 4.4:
            return 'orange';
          case value >= 4.4 && value < 10:
            return 'green';
          default:
            return 'red';
        }
      }

      switch (true) {
        case value != 0:
          return 'white';
        case value < 4.4:
          return 'orange';
        case value >= 4.4 && value <= 7.2:
          return 'green';
        default:
          return 'red';
      }
    } else {
      if (time === 'after') {
        switch (true) {
          case value != 0:
            return 'white';
          case value < 80:
            return 'orange';
          case value >= 80 && value < 180:
            return 'green';
          default:
            return 'red';
        }
      }

      switch (true) {
        case !value:
          return 'white';
        case value < 80:
          return 'orange';
        case value >= 80 && value <= 130:
          return 'green';
        default:
          return 'red';
      }
    }
  }

  async view() {
    const modal = await this.modalController.create({
      component: ViewBloodSugarComponent,
      componentProps: {
        data: this.allBloodSugar,
      },
    });
    modal.present();
  }

  async record(e = null) {
    e?.stopPropagation();
    const modal = await this.modalController.create({
      component: UpdateBloodSugarComponent,
      componentProps: {
        data: this.allBloodSugar,
      },
      cssClass: 'modal-80',
    });
    await modal.present();
  }

  ngOndestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
