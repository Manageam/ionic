import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { ReminderService } from 'src/app/services/reminder/reminder.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { LocalNotifications } from '@capacitor/local-notifications';

import { format, parseISO } from 'date-fns';

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

  dateString = this.formatDate(this.reminder.time);
  subs = [];
  minDate = new Date();

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

    console.log(this.reminder.time);
  }

  close() {
    this.modal.dismiss();
  }

  change(value) {
    console.log(value);
    this.reminder.time = value;
    this.dateString = this.formatDate(value);
  }

  formatDate(iso) {
    return format(new Date(iso), 'HH:mm, MMMM d, yyyy');
  }

  save() {
    if (
      !this.reminder.category ||
      !this.reminder.title ||
      !this.reminder.time ||
      !this.reminder.repeat ||
      !this.reminder.note
    )
      return this.global.alert('Add reminder', 'All fields are required!', [
        'Okay',
      ]);
    const data = {
      ...this.reminder,
      id: Math.floor(Math.random() * 1000000 + 1),
    };
    this.reminderService.add(data).subscribe(() => {
      this.schedule(data);
      this.webSocket.emit('reminder:update', {
        user_id: this.auth.loggedUser().id,
      });
      this.global.alert('Add reminder', 'Reminder sucessfully added!', [
        'Okay',
      ]);
      this.close();
    });
  }

  schedule(notification) {
    const date = new Date(notification.time);
    let schedule: { every?; repeat?; at } = { at: date };
    if (notification.repeat != 'never') {
      schedule.every = notification.repeat;
      schedule.repeat = true;
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
