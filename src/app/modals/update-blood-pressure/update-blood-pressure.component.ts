import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { BloodPressureService } from 'src/app/services/blood-pressure/blood-pressure.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { fetchBloodPressureTips } from 'src/assets/scripts/misc';

@Component({
  selector: 'app-update-blood-pressure',
  templateUrl: './update-blood-pressure.component.html',
  styleUrls: ['./update-blood-pressure.component.scss'],
})
export class UpdateBloodPressureComponent implements OnInit {
  pressure = {
    upper: '',
    lower: '',
  };
  tip = '';
  subs = [];
  constructor(
    public modalController: ModalController,
    private bloodPressureService: BloodPressureService,
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
    if (this.pressure.upper == '' || this.pressure.lower == '') {
      this.tip = '';
      return;
    }

    this.tip = fetchBloodPressureTips(
      this.pressure.upper,
      this.pressure.lower
    ).tips;
  }

  scrollIntoView(el: Element) {
    el.scrollIntoView();
  }

  save() {
    if (!this.pressure.lower || !this.pressure.upper)
      return this.global.alert(
        'Update blood pressure',
        'All fields are required!',
        ['OK']
      );
    this.bloodPressureService
      .add({ time: new Date(), ...this.pressure })
      .subscribe((data) => {
        this.modalController.dismiss();
        this.webSocket.emit('blood-pressure:update', {
          user_id: this.auth.loggedUser().id,
        });
        this.global.alert(
          'Update blood pressure',
          'Blood pressure sucessfully updated!',
          ['OK']
        );
      });
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
