import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss'],
})
export class SingleComponent implements OnInit {
  data: any = {};
  constructor(public modalController: ModalController) {}

  ngOnInit() {}
  @Input()
  set topic(data) {
    this.data = data;
    console.log(data);
  }
}
