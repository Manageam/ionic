import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LanguageSettingsComponent } from '../language-settings/language-settings.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  constructor(public modalController: ModalController) {}

  ngOnInit() {}
  async openLanguages() {
    const modal = await this.modalController.create({
      component: LanguageSettingsComponent,
      cssClass: 'modal-70',
    });
    modal.present();
  }
}
