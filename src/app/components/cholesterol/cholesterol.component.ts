import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CholesterolService } from 'src/app/services/cholesterol/cholesterol.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { UpdateCholesterolComponent } from '../update-cholesterol/update-cholesterol.component';
import { ViewCholesterolComponent } from '../view-cholesterol/view-cholesterol.component';

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
      this.color = this.changeColor(
        this.cholesterol.unit,
        this.cholesterol.reading
      );
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

  changeColor(unit, value) {
    if (String(unit).toLowerCase() === 'mmol/l') {
      switch (true) {
        case value === 0:
          return '#fff';
        case value < 5.2:
          return 'green';
        case value >= 5.2 && value < 6.3:
          return 'orange';
        case value >= 6.3:
          return 'red';
        default:
          return '#fff';
      }
    }

    switch (true) {
      case value === '0':
        return '#fff';
      case value < 200:
        return 'green';
      case value >= 200 && value < 240:
        return 'orange';
      case value >= 240:
        return 'red';
      default:
        return '#fff';
    }
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
