import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  constructor(
    public modalController: ModalController,
    private reminderService: ReminderService
  ) {}

  ngOnInit() {}
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
}
