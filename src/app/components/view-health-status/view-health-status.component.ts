import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-view-health-status',
  templateUrl: './view-health-status.component.html',
  styleUrls: ['./view-health-status.component.scss'],
})
export class ViewHealthStatusComponent implements OnInit {
  constructor(public modalController: ModalController) {}

  ngOnInit() {}
  update() {
    console.log('hello');
  }
}
