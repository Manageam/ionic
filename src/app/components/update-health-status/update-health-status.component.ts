import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-update-health-status',
  templateUrl: './update-health-status.component.html',
  styleUrls: ['./update-health-status.component.scss'],
})
export class UpdateHealthStatusComponent implements OnInit {
  constructor(public modalController: ModalController) {}

  ngOnInit() {}
  save() {}
}
