import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-update-hba1c',
  templateUrl: './update-hba1c.component.html',
  styleUrls: ['./update-hba1c.component.scss'],
})
export class UpdateHba1cComponent implements OnInit {
  constructor(public modalController: ModalController) {}

  ngOnInit() {}
  save() {}
}
