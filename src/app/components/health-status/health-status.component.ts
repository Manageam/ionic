import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { HealthService } from 'src/app/services/health/health.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { checkHealthStatus } from 'src/assets/scripts/misc';
import { UpdateHealthStatusComponent } from 'src/app/modals/update-health-status/update-health-status.component';
import { ViewHealthStatusComponent } from '../../modals/view-health-status/view-health-status.component';

@Component({
  selector: 'app-health-status',
  templateUrl: './health-status.component.html',
  styleUrls: ['./health-status.component.scss'],
})
export class HealthStatusComponent implements OnInit {
  subs = [];
  healthStatus: any = {};
  constructor(
    private modalController: ModalController,
    private healthService: HealthService,
    private webSocket: WebsocketService,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    let sub = this.healthService.getHealth().subscribe((data) => {
      this.healthStatus = data;
      this.healthStatus.name = checkHealthStatus(data.diabetics);
    });

    this.subs.push(sub);

    sub = this.webSocket
      .listen('health-status:update')
      .subscribe(({ user_id }: { user_id }) => {
        if (user_id != this.auth.loggedUser().id) return;
        this.healthService.updateHealth();
      });
    this.subs.push(sub);
  }
  async view() {
    const modal = await this.modalController.create({
      component: ViewHealthStatusComponent,
      componentProps: {
        status: this.healthStatus,
      },
    });

    modal.onDidDismiss().then((res) => {
      const { data } = res;
      if (data) this.change(null);
    });
    modal.present();
  }

  async change(e) {
    e?.stopPropagation();
    const modal = await this.modalController.create({
      component: UpdateHealthStatusComponent,
      componentProps: { value: this.healthStatus.diabetics },
      cssClass: 'modal-60',
    });
    await modal.present();
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
