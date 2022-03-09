import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarModalOptions } from 'ion2-calendar';

@Component({
  selector: 'app-calendar-modal',
  templateUrl: './calendar-modal.component.html',
  styleUrls: ['./calendar-modal.component.scss'],
})
export class CalendarModalComponent implements OnInit {
  dateRange: { from: string; to: string };
  type: 'string';
  optionsRange: CalendarModalOptions = {
    pickMode: 'range',
    canBackwardsSelected: true,
  };
  constructor(public modalController: ModalController) {}
  ngOnInit() {}

  save() {
    let data: any;
    if (this.dateRange && this.dateRange.from && this.dateRange.to) {
      data = {
        from: this.dateRange.from.toString(),
        to: this.dateRange.to.toString(),
      };
    }
    this.modalController.dismiss(data);
  }
}
