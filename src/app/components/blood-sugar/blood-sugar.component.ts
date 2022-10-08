import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { BloodSugarService } from 'src/app/services/blood-sugar/blood-sugar.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { fetchBloodSugarTips } from 'src/assets/scripts/misc';
import { UpdateBloodSugarComponent } from '../../modals/update-blood-sugar/update-blood-sugar.component';
import { ViewBloodSugarComponent } from '../../modals/view-blood-sugar/view-blood-sugar.component';

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
      console.log("data slice>>", this.bloodSugar);
      if (this.bloodSugar)
      console.log("reading set from form>>", this.bloodSugar.reading);
        this.bloodSugar.reading = this.bloodSugar.reading.valueOf();
        console.log("actual blood sugar reading>>", this.bloodSugar.reading);
      this.color = this.bloodSugar
        ? fetchBloodSugarTips(this.bloodSugar).color
        : 'gray';
    });
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
      // cssClass: 'modal-80',
    });
    await modal.present();
  }

  ngOndestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
