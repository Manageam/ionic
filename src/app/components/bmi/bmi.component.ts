import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { BmiService } from 'src/app/services/bmi/bmi.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { fetchBMI } from 'src/assets/scripts/misc';
import { UpdateBmiComponent } from '../../modals/update-bmi/update-bmi.component';
import { ViewBmiComponent } from '../../modals/view-bmi/view-bmi.component';

@Component({
  selector: 'app-bmi',
  templateUrl: './bmi.component.html',
  styleUrls: ['./bmi.component.scss'],
})
export class BmiComponent implements OnInit {
  subs = [];
  bmi: any = null;
  allBmi = [];
  color = 'gray';
  constructor(
    private modalController: ModalController,
    private bmiService: BmiService,
    private webSocket: WebsocketService,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    let sub = this.bmiService.get().subscribe((data) => {
      this.allBmi = data;
      this.bmi = data.slice(-1)[0];
      if (!this.bmi) return;
      this.color = fetchBMI(this.bmi.mass).color;
      this.bmi.mass = Number(this.bmi.mass).toFixed(1);
    });
    this.subs.push(sub);

    sub = this.webSocket
      .listen('bmi:update')
      .subscribe(({ user_id }: { user_id }) => {
        if (user_id != this.auth.loggedUser().id) return;
        this.bmiService.update();
      });
    this.subs.push(sub);
  }

  updateColor(value) {
    switch (true) {
      case value === 0 || value === '0':
        return '#fff';
      case value < 18.5:
        return '#0784c3';
      case value >= 18.5 && value <= 24.9:
        return 'green';
      case value >= 25 && value < 30:
        return 'rgb(255, 236, 0)';
      case value >= 30:
        return 'red';
      default:
        return '#fff';
    }
  }
  async view() {
    const modal = await this.modalController.create({
      component: ViewBmiComponent,
      componentProps: {
        data: this.allBmi,
      },
    });
    modal.present();
  }

  async record(e = null) {
    e?.stopPropagation();
    const modal = await this.modalController.create({
      component: UpdateBmiComponent,
      // cssClass: 'modal-80',
    });
    await modal.present();
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
