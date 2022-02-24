import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { HealthService } from 'src/app/services/health/health.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { fetchTip } from 'src/assets/scripts/misc';

@Component({
  selector: 'app-update-hba1c',
  templateUrl: './update-hba1c.component.html',
  styleUrls: ['./update-hba1c.component.scss'],
})
export class UpdateHba1cComponent implements OnInit {
  hba1c = {
    unit: '',
    number: '',
  };
  tip = '';
  subs = [];
  constructor(
    public modalController: ModalController,
    private healthService: HealthService,
    private platform: Platform,
    private global: GlobalService,
    private webSocket: WebsocketService,
    private auth: AuthenticationService
  ) {}
  updateTip() {
    this.tip = fetchTip(this.hba1c);
  }
  ngOnInit() {
    let sub = this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
    this.subs.push(sub);
  }
  save() {
    if (!this.hba1c.number || !this.hba1c.unit)
      return this.global.alert('Update Hba1c', 'All fields are required!', [
        'OK',
      ]);
    this.healthService.addHba1c(this.hba1c).subscribe((data) => {
      this.webSocket.emit('hba1c:update', {
        user_id: this.auth.loggedUser().id,
      });
      this.modalController.dismiss();
      this.global.alert('Update Hba1c', 'Hba1c sucessfully updated!', ['OK']);
    });
  }

  scrollIntoView(el: Element) {
    el.scrollIntoView();
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
