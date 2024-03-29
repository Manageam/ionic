import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CholesterolService } from 'src/app/services/cholesterol/cholesterol.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { fetchCholesterolTips } from 'src/assets/scripts/misc';

@Component({
  selector: 'app-update-cholesterol',
  templateUrl: './update-cholesterol.component.html',
  styleUrls: ['./update-cholesterol.component.scss'],
})
export class UpdateCholesterolComponent implements OnInit {
  cholesterol = {
    unit: '',
    reading: '',
  };
  tip = '';
  subs = [];
  constructor(
    public modalController: ModalController,
    private cholesterolService: CholesterolService,
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
    if (this.cholesterol.unit == '' || this.cholesterol.reading == '') {
      this.tip = '';
      return;
    }

    this.tip = fetchCholesterolTips(
      this.cholesterol.unit,
      this.cholesterol.reading
    ).tips;
  }
  save() {
    if (!this.cholesterol.unit || !this.cholesterol.reading)
      return this.global.alert(
        'Update cholesterol',
        'All fields are required!',
        ['OK']
      );
    this.cholesterolService.add(this.cholesterol).subscribe(() => {
      this.webSocket.emit('cholesterol:update', {
        user_id: this.auth.loggedUser().id,
      });
      this.modalController.dismiss();
      this.global.alert(
        'Update cholesterol',
        'Cholesterol sucessfully updated!',
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
