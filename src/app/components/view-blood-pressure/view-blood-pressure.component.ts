import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-view-blood-pressure',
  templateUrl: './view-blood-pressure.component.html',
  styleUrls: ['./view-blood-pressure.component.scss'],
})
export class ViewBloodPressureComponent implements OnInit {
  expand = null;
  constructor(public modalController: ModalController) {}

  ngOnInit() {}
  share() {}
  toggle(i) {
    if (i == this.expand) {
      this.expand = null;
    } else {
      this.expand = i;
    }
  }
  remove(i) {}
}
