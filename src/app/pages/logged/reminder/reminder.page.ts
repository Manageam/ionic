import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { ReminderService } from 'src/app/services/reminder/reminder.service';
import { AddReminderComponent } from 'src/app/components/add-reminder/add-reminder.component';
import dateFormat from 'dateformat';
import { GlobalService } from 'src/app/services/global/global.service';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.page.html',
  styleUrls: ['./reminder.page.scss'],
})
export class ReminderPage implements OnInit {
  expand = null;
  reminders = [];
  tip: any = {};
  subs = [];
  constructor(
    public modalController: ModalController,
    private reminderService: ReminderService,
    private global: GlobalService,
    private userService: UserService,
    private platform: Platform,
    public router: Router,
    private webSocket: WebsocketService,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    let sub = this.reminderService.get().subscribe((data) => {
      this.reminders = data.map((d) => {
        d.date = dateFormat(new Date(d.created_at), 'dd mmm, yyyy-hh:MMtt');
        return d;
      });
    });
    this.subs.push(sub);

    sub = this.userService.fetchTip().subscribe((data) => {
      this.tip = data;
    });

    this.subs.push(sub);

    sub = this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
    this.subs.push(sub);

    sub = this.webSocket
      .listen('reminder:update')
      .subscribe(({ user_id }: { user_id }) => {
        if (user_id != this.auth.loggedUser().id) return;
        this.reminderService.update();
      });
    this.subs.push(sub);
  }

  toggle(i) {
    if (i == this.expand) {
      this.expand = null;
    } else {
      this.expand = i;
    }
  }

  async remove(id) {
    const { role } = <{ role }>await this.global.alert(
      'Remove alert/reminder',
      'Are you sure you want to remove alert/reminder?',
      [
        { role: false, text: 'Cancel' },
        { role: true, text: 'OK' },
      ]
    );

    if (!role) return;
    this.reminderService.remove(id).subscribe((d) => {
      this.reminders = this.reminders.filter((r) => r.id != id);
      this.webSocket.emit('reminder:update', {
        user_id: this.auth.loggedUser().id,
      });
      this.reminderService.update();
    });
  }

  async showAdd() {
    const modal = await this.modalController.create({
      component: AddReminderComponent,
      cssClass: 'modal-80',
    });
    modal.present();
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
