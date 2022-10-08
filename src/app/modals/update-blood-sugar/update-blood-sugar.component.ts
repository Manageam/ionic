import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { BloodSugarService } from 'src/app/services/blood-sugar/blood-sugar.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { fetchBloodSugarTips } from 'src/assets/scripts/misc';

@Component({
  selector: 'app-update-blood-sugar',
  templateUrl: './update-blood-sugar.component.html',
  styleUrls: ['./update-blood-sugar.component.scss'],
})
export class UpdateBloodSugarComponent implements OnInit {
  bloodSugar = {
    unit: '',
    reading_time: '',
    reading: '',
  };
  tip = '';
  subs = [];
  constructor(
    public modalController: ModalController,
    private bloodSugarService: BloodSugarService,
    private platform: Platform,
    private global: GlobalService,
    private webSocket: WebsocketService,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    let sub = this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
    this.subs.push(sub);
  }
  updateTip() {
    if (
      this.bloodSugar.unit == '' ||
      this.bloodSugar.reading_time == '' ||
      this.bloodSugar.reading.valueOf() == ''
    ) {
      this.tip = '';
      return;
    }
    this.tip = fetchBloodSugarTips({
      ...this.bloodSugar,
      value: this.bloodSugar.reading.valueOf(),
    }).tips;
  }

  save() {
    if (
      !this.bloodSugar.reading.valueOf() ||
      !this.bloodSugar.reading_time ||
      !this.bloodSugar.unit
    )
      return this.global.alert(
        'Update blood sugar',
        'All fields are required!',
        ['OK']
      );
    this.bloodSugarService
      .add({ ...this.bloodSugar, time: new Date() })
      .subscribe((data) => {
        console.log("data>>", data);
        this.modalController.dismiss();
        this.webSocket.emit('blood-sugar:update', {
          user_id: this.auth.loggedUser().id,
        });
        this.global.alert(
          'Update blood sugar',
          'Blood sugar sucessfully updated!',
          ['OK']
        );
      });
  }

  scrollIntoView(el: Element) {
    el.scrollIntoView();
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
