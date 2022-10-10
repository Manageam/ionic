import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';

@Component({
  selector: 'app-view-meal',
  templateUrl: './view-meal.component.html',
  styleUrls: ['./view-meal.component.scss'],
})
export class ViewMealComponent implements OnInit {
  meal: any = {};
  allCab = [];
  allPro = [];
  allFru = [];
  subs = [];
  constructor(
    public modalController: ModalController,
    private global: GlobalService,
    private platform: Platform,
    private webSocket: WebsocketService,
    private auth: AuthenticationService
  ) {}
  @Input()
  set data(val) {
    this.meal = val;
    this.allCab = val.foods.filter((f) => f.category == 1);
    this.allFru = val.foods.filter((f) => f.category == 2);
    this.allPro = val.foods.filter((f) => f.category == 3);
  }
  ngOnInit() {
    let sub = this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
    this.subs.push(sub);

    sub = this.webSocket
      .listen('meals:delete')
      .subscribe(({ user_id, id }: { user_id; id }) => {
        if (user_id != this.auth.loggedUser().id) return;

        if (this.meal.id == id) {
          this.modalController.dismiss();
          this.global.alert(
            'Remove meal plan',
            'This meal plan has been removed!',
            ['Okay']
          );
        }
      });
    this.subs.push(sub);
  }

  async remove() {
    const { role } = <{ role }>await this.global.alert(
      'Remove meal plan',
      'Are you sure you want to remove meal plan?',
      [
        { role: false, text: 'Cancel' },
        { role: true, text: 'OK' },
      ]
    );
    if (!role) return;
    return this.modalController.dismiss(this.meal);
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
