import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { ReminderService } from 'src/app/services/reminder/reminder.service';

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
  constructor(
    public modalController: ModalController,
    private reminderService: ReminderService,
    private platform: Platform
  ) {}

  ngOnInit() {
    const sub = this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
    this.subs.push(sub);
  }
  save() {
    const data = {
      ...this.reminder,
      id: Math.floor(Math.random() * 1000000 + 1),
    };
    this.reminderService.add(data).subscribe((data) => {
      this.reminderService.update();
      this.modalController.dismiss();
    });
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
