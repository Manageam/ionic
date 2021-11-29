import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReminderService } from 'src/app/services/reminder/reminder.service';
import { AddReminderComponent } from '../add-reminder/add-reminder.component';
import dateFormat from 'dateformat';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss'],
})
export class ReminderComponent implements OnInit {
  expand = null;
  reminders = [];
  constructor(
    public modalController: ModalController,
    private reminderService: ReminderService,
    private global: GlobalService
  ) {}

  ngOnInit() {
    this.reminderService.get().subscribe((data) => {
      this.reminders = data.map((d) => {
        d.date = dateFormat(new Date(d.created_at), 'dd mmm, yyyy-hh:MMtt');
        return d;
      });
    });
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
}
