import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-view-cholesterol',
  templateUrl: './view-cholesterol.component.html',
  styleUrls: ['./view-cholesterol.component.scss'],
})
export class ViewCholesterolComponent implements OnInit {
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
