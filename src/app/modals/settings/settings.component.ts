import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { LanguageSettingsComponent } from '../language-settings/language-settings.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  subs = [];
  constructor(
    public modalController: ModalController,
    private platform: Platform
  ) {}

  ngOnInit() {
    let sub = this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
    this.subs.push(sub);
  }
  async openLanguages() {
    const modal = await this.modalController.create({
      component: LanguageSettingsComponent,
      cssClass: 'modal-70',
    });
    modal.present();
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
