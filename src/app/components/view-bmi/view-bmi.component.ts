import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-view-bmi',
  templateUrl: './view-bmi.component.html',
  styleUrls: ['./view-bmi.component.scss'],
})
export class ViewBmiComponent implements OnInit {
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
