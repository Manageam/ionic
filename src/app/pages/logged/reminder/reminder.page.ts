import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { ReminderService } from 'src/app/services/reminder/reminder.service';
import { AddReminderComponent } from 'src/app/modals/add-reminder/add-reminder.component';
import dateFormat from 'dateformat';
import { GlobalService } from 'src/app/services/global/global.service';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.page.html',
  styleUrls: ['./reminder.page.scss'],
})
export class ReminderPage implements OnInit {
  expand = null;
  reminders = [];
  activeReminders = [];
  tip: any = {};
  subs = [];
  opener = null;
  constructor(
    public modalController: ModalController,
    private reminderService: ReminderService,
    private global: GlobalService,
    private userService: UserService,
    private platform: Platform,
    public router: Router,
    private webSocket: WebsocketService,
    private auth: AuthenticationService,
    public location: NavController
  ) {}

  ngOnInit() {
    let sub = this.reminderService.get().subscribe(async (data) => {
      const activeNotifications = await LocalNotifications.getPending();

      console.log(
        activeNotifications.notifications.length,
        activeNotifications.notifications,
        'active nofications'
      );
      this.reminders = data.map((d) => {
        d.date = dateFormat(new Date(d.time), 'dd mmm, yyyy-hh:MMtt');

        // check if reminder is active
        const isActive = !!activeNotifications.notifications.find(
          (notif) => notif.id == d.id
        );

        return { ...d, isActive };
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

  async cancel(id) {
    await LocalNotifications.cancel({ notifications: [{ id }] });
    this.reminders = this.reminders.map((reminder) =>
      reminder.id == id ? { ...reminder, isActive: false } : reminder
    );
  }

  async schedule(notification) {
    const date = new Date(notification.time);
    let schedule: { every?; repeats?; at } = { at: date };
    if (notification.repeat != 'never') {
      schedule.every = notification.repeat;
      schedule.repeats = true;
    }

    await LocalNotifications.schedule({
      notifications: [
        {
          title: notification.title,
          body: notification.note,
          id: notification.id,
          schedule,
        },
      ],
    });

    // this.reminders = this.reminders.map((reminder) =>
    //   reminder.id == notification.id
    //     ? { ...reminder, isActive: true }
    //     : reminder
    // );
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
      this.cancel(id);
      this.webSocket.emit('reminder:update', {
        user_id: this.auth.loggedUser().id,
      });
      this.reminderService.update();
    });
  }

  async showAdd(reminder = null) {
    this.modalController
      .create({
        component: AddReminderComponent,
        cssClass: 'modal-80',
        componentProps: { modal: opener, data: reminder },
      })
      .then((modal) => {
        this.opener = modal;
        modal.present();
      });
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
