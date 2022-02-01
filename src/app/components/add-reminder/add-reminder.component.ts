import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { ReminderService } from 'src/app/services/reminder/reminder.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { LocalNotifications } from '@capacitor/local-notifications';
import { repeat } from 'rxjs/operators';

@Component({
  selector: 'app-add-reminder',
  templateUrl: './add-reminder.component.html',
  styleUrls: ['./add-reminder.component.scss'],
})
export class AddReminderComponent implements OnInit {
  reminder = {
    category: '',
    title: '',
    time: '',
    repeat: '',
    note: '',
  };
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
      this.modalController.dismiss();
    });
    this.subs.push(sub);
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
      this.modalController.dismiss();
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
