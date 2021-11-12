import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddReminderComponent } from '../add-reminder/add-reminder.component';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss'],
})
export class ReminderComponent implements OnInit {
  expand = null;
  constructor(public modalController: ModalController) {}

  ngOnInit() {}
  toggle(i) {
    if (i == this.expand) {
      this.expand = null;
    } else {
      this.expand = i;
    }
  }
  remove(i) {}

  async showAdd() {
    const modal = await this.modalController.create({
      component: AddReminderComponent,
      cssClass: 'modal-80',
    });
    modal.present();
  }
}
