import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-reminder',
  templateUrl: './add-reminder.component.html',
  styleUrls: ['./add-reminder.component.scss'],
})
export class AddReminderComponent implements OnInit {
  reminder = {
    category: '',
    title: '',
    date: '',
    repeat: '',
    note: '',
  };
  constructor(public modalController: ModalController) {}

  ngOnInit() {}
  save() {}
}
