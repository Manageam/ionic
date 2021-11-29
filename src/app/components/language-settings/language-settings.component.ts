import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-language-settings',
  templateUrl: './language-settings.component.html',
  styleUrls: ['./language-settings.component.scss'],
})
export class LanguageSettingsComponent implements OnInit {
  languages = [
    'Hausa',
    'Igbo',
    'Yoruba',
    'Enlish',
    'Kiswahili',
    'Shona',
    'Zulu',
  ];
  subs = [];
  constructor(
    public modalController: ModalController,
    private global: GlobalService,
    private platform: Platform
  ) {}

  ngOnInit() {
    let sub = this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
    this.subs.push(sub);
  }

  async save() {
    this.global.alert(
      'Language Settings',
      'Your language settings has been changed!',
      ['Okay']
    );
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
