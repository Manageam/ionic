import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-view-blood-sugar',
  templateUrl: './view-blood-sugar.component.html',
  styleUrls: ['./view-blood-sugar.component.scss'],
})
export class ViewBloodSugarComponent implements OnInit {
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
