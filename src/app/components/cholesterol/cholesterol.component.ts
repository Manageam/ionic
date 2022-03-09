import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CholesterolService } from 'src/app/services/cholesterol/cholesterol.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { fetchCholesterolTips } from 'src/assets/scripts/misc';
import { UpdateCholesterolComponent } from '../../modals/update-cholesterol/update-cholesterol.component';
import { ViewCholesterolComponent } from '../../modals/view-cholesterol/view-cholesterol.component';

@Component({
  selector: 'app-cholesterol',
  templateUrl: './cholesterol.component.html',
  styleUrls: ['./cholesterol.component.scss'],
})
export class CholesterolComponent implements OnInit {
  color = 'gray';
  cholesterol: any = null;
  subs = [];
  allCholesterol = [];
  constructor(
    private modalController: ModalController,
    private cholesterolService: CholesterolService,
    private webSocket: WebsocketService,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    let sub = this.cholesterolService.get().subscribe((data) => {
      this.allCholesterol = data;
      this.cholesterol = data.slice(-1)[0];
      if (!this.cholesterol) return;
      this.cholesterol.reading = Number(this.cholesterol.reading).toFixed(2);

      this.color = fetchCholesterolTips(
        this.cholesterol.unit,
        this.cholesterol.reading
      ).color;
    });

    this.subs.push(sub);

    sub = this.webSocket
      .listen('cholesterol:update')
      .subscribe(({ user_id }: { user_id }) => {
        if (user_id != this.auth.loggedUser().id) return;
        this.cholesterolService.update();
      });
    this.subs.push(sub);
  }

  async view() {
    const modal = await this.modalController.create({
      component: ViewCholesterolComponent,
      componentProps: {
        data: this.allCholesterol,
      },
    });
    modal.present();
  }

  async record(e = null) {
    e?.stopPropagation();
    const modal = await this.modalController.create({
      component: UpdateCholesterolComponent,
      cssClass: 'modal-80',
    });
    await modal.present();
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
