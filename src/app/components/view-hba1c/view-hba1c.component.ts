import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-view-hba1c',
  templateUrl: './view-hba1c.component.html',
  styleUrls: ['./view-hba1c.component.scss'],
})
export class ViewHba1cComponent implements OnInit {
  segment = 'history';
  expand = null;
  constructor(public modalController: ModalController) {}

  ngOnInit() {}
  share() {}
  segmentChanged(e) {
    this.segment = e.detail.value;
  }
  toggle(i) {
    if (i == this.expand) {
      this.expand = null;
    } else {
      this.expand = i;
    }
  }
  remove(i) {}
}
