import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { ReminderService } from 'src/app/services/reminder/reminder.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { LocalNotifications } from '@capacitor/local-notifications';

import { format, parseISO } from 'date-fns';
import { timer } from 'rxjs';

@Component({
  selector: 'app-add-reminder',
  templateUrl: './add-reminder.component.html',
  styleUrls: ['./add-reminder.component.scss'],
})
export class AddReminderComponent implements OnInit {
  @Input() modal = null;
  reminder = {
    category: '',
    title: '',
    time: new Date().toISOString(),
    repeat: '',
    note: '',
  };

  reminderId = null;

  dateString = this.formatDate(this.reminder.time);
  subs = [];
  minDate = new Date().getFullYear();

  constructor(
    public modalController: ModalController,
    private reminderService: ReminderService,
    private platform: Platform,
    private webSocket: WebsocketService,
    private auth: AuthenticationService,
    private global: GlobalService
  ) {}

  ngOnInit() {
    const sub = this.platform.backButton.subscribe(() => {
      this.close();
    });
    this.subs.push(sub);
  }

  @Input() set data(d) {
    console.log(d);
    if (d) {
      for (const key in this.reminder) {
        this.reminder[key] = d[key];
      }
      this.reminder.repeat = d.repeat_on;
      this.reminderId = d.id;
    }
  }

  openDateTime() {
    timer(100).subscribe(() => {
      document
        .querySelector('ion-datetime')
        .shadowRoot.querySelector('.time-body')
        .setAttribute('style', 'font-size: 24px');
    });
  }

  close() {
    this.modal.dismiss();
  }

  change(value) {
    this.reminder.time = value;
    this.dateString = this.formatDate(value);
  }

  formatDate(iso) {
    return format(new Date(iso), 'HH:mm, MMMM d, yyyy');
  }

  save() {
    const header = this.reminderId ? 'Update reminder' : 'Add reminder';
    if (
      !this.reminder.category ||
      !this.reminder.title ||
      !this.reminder.time ||
      !this.reminder.repeat
    )
      return this.global.alert(header, 'All fields are required!', ['Okay']);
    if (!this.reminderId) {
      const data = {
        ...this.reminder,
        id: Math.floor(Math.random() * 1000000 + 1),
      };
      this.reminderService.add(data).subscribe(() => {
        this.schedule(data);
        this.webSocket.emit('reminder:update', {
          user_id: this.auth.loggedUser().id,
        });
        this.global.alert(header, 'Reminder sucessfully added!', ['Okay']);
        this.close();
      });
    } else {
      // update the time
      const time = this.addTime(this.reminder.time, this.reminder.repeat);

      this.reminder = { ...this.reminder, time };
      this.reminderService
        .updateOne(this.reminderId, this.reminder)
        .subscribe(() => {
          this.schedule({ id: this.reminderId, ...this.reminder });
          this.webSocket.emit('reminder:update', {
            user_id: this.auth.loggedUser().id,
          });
          this.global.alert(header, 'Reminder sucessfully updated!', ['Okay']);
          this.close();
        });
    }
  }

  addTime(time, type) {
    const date = new Date(time);
    const now = new Date();
    const timeDiff = now.getTime() - date.getTime();
    const daysDiff = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (date > now) return time;

    // find out the difference in time and then figure out the next trigger time.

    if (type == 'minute') {
      date.setMinutes(
        date.getMinutes() + Math.floor(timeDiff / (1000 * 60)) + 1
      );
    } else if (type == 'hour') {
      date.setHours(
        date.getHours() + Math.floor(timeDiff / (1000 * 60 * 60)) + 1
      );
    } else if (type == 'day') {
      date.setDate(
        date.getDate() + Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1
      );
    } else if (type == 'week') {
      date.setDate(date.getDate() + (7 - (daysDiff % 7)) + daysDiff);
    } else if (type == 'month') {
      date.setDate(date.getDate() + (31 - (daysDiff % 31)) + daysDiff);
    } else if (type == 'year') {
      date.setDate(date.getDate() + (365 - (daysDiff % 365)) + daysDiff);
    }

    return date.toISOString();
  }

  async schedule(notification) {
    // if already scheduled, cancel
    if (this.reminderId) {
      await LocalNotifications.cancel({
        notifications: [{ id: this.reminderId }],
      });
    }

    const date = new Date(notification.time);
    let schedule: { every?; repeats?; at } = { at: date };
    if (notification.repeat != 'never') {
      schedule.every = notification.repeat;
      schedule.repeats = true;
    }

    LocalNotifications.schedule({
      notifications: [
        {
          title: notification.title,
          body: notification.note,
          id: notification.id,
          schedule,
        },
      ],
    });
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
