import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { BmiService } from 'src/app/services/bmi/bmi.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { fetchBMI } from 'src/assets/scripts/misc';

@Component({
  selector: 'app-update-bmi',
  templateUrl: './update-bmi.component.html',
  styleUrls: ['./update-bmi.component.scss'],
})
export class UpdateBmiComponent implements OnInit {
  bmi = {
    unit: '',
    height: '',
    weight: '',
    mass: null,
  };
  tip = '';
  subs = [];
  constructor(
    public modalController: ModalController,
    private bmiService: BmiService,
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
    const unit = this.bmi.unit;
    const weight = Number(this.bmi.weight);
    const height = Number(this.bmi.height);

    if (unit === 'pounds/inch') {
      let calc = weight / Math.pow(height, 2);
      this.bmi.mass = calc * 703;
    } else this.bmi.mass = weight / Math.pow(height, 2);

    if (!this.bmi.unit || !this.bmi.height || !this.bmi.weight) {
      this.tip = '';
      return;
    }

    this.bmi.mass = this.bmi.mass.toFixed(2);
    this.tip = fetchBMI(this.bmi.mass).tips;
  }

  save() {
    const data = Object.assign({}, this.bmi);
    if (!this.bmi.unit || !this.bmi.height || !this.bmi.weight)
      return this.global.alert('Update BMI', 'All fields are required!', [
        'OK',
      ]);
    delete data.height;
    delete data.weight;

    this.bmiService.add({ ...data, time: new Date() }).subscribe(() => {
      this.modalController.dismiss();
      this.webSocket.emit('bmi:update', {
        user_id: this.auth.loggedUser().id,
      });
      this.global.alert('Update BMI', 'BMI sucessfully updated!', ['OK']);
    });
  }

  scrollIntoView(el: Element) {
    el.scrollIntoView();
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
