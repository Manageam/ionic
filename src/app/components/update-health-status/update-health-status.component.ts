import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { HealthService } from 'src/app/services/health/health.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';

@Component({
  selector: 'app-update-health-status',
  templateUrl: './update-health-status.component.html',
  styleUrls: ['./update-health-status.component.scss'],
})
export class UpdateHealthStatusComponent implements OnInit {
  @Input() value = '';
  subs = [];
  constructor(
    public modalController: ModalController,
    private healthService: HealthService,
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

  save() {
    this.healthService.addHealth(this.value).subscribe((data) => {
      this.webSocket.emit('health-status:update', {
        user_id: this.auth.loggedUser().id,
      });
      this.modalController.dismiss();
      this.global.alert(
        'Update health status',
        'Health status sucessfully updated!',
        ['OK']
      );
    });
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
