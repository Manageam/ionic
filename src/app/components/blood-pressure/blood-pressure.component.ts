import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { BloodPressureService } from 'src/app/services/blood-pressure/blood-pressure.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';

import { UpdateBloodPressureComponent } from '../update-blood-pressure/update-blood-pressure.component';
import { ViewBloodPressureComponent } from '../view-blood-pressure/view-blood-pressure.component';

@Component({
  selector: 'app-blood-pressure',
  templateUrl: './blood-pressure.component.html',
  styleUrls: ['./blood-pressure.component.scss'],
})
export class BloodPressureComponent implements OnInit {
  bloodPressure: any = null;
  allBloodPressure = [];
  subs = [];
  color = '';
  constructor(
    private modalController: ModalController,
    private bloodPressureService: BloodPressureService,
    private webSocket: WebsocketService,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    let sub = this.bloodPressureService.get().subscribe((data) => {
      this.allBloodPressure = data;
      this.bloodPressure = data.slice(-1)[0];
      this.color = this.bloodPressure
        ? this.updateSugarColor(
            this.bloodPressure.upper,
            this.bloodPressure.lower
          )
        : 'gray';
    });

    this.subs.push(sub);

    sub = this.webSocket
      .listen('blood-pressure:update')
      .subscribe(({ user_id }: { user_id }) => {
        if (user_id != this.auth.loggedUser().id) return;
        this.bloodPressureService.update();
      });
    this.subs.push(sub);
  }

  updateSugarColor(upper, lower) {
    switch (true) {
      case upper === 0 && lower === 0:
        return '#fff';
      case upper <= 120 && upper >= 90 && lower <= 80 && lower >= 60:
        return 'green';
      case upper < 90:
        return 'rgb(94, 93, 92)';
      case upper > 120 && upper <= 129:
        return 'rgb(255, 236, 0)';
      case upper >= 130 && upper < 139:
        return 'rgb(240, 128, 79)';
      case upper >= 140:
        return 'red';
      default:
        return 'red';
    }
  }
  async view() {
    const modal = await this.modalController.create({
      component: ViewBloodPressureComponent,
      componentProps: {
        data: this.allBloodPressure,
      },
    });
    modal.present();
  }

  async record(e = null) {
    e?.stopPropagation();
    const modal = await this.modalController.create({
      component: UpdateBloodPressureComponent,
      cssClass: 'modal-80',
    });
    await modal.present();
  }

  ngOndestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
