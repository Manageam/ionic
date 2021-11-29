import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  constructor(
    public modalController: ModalController,
    private global: GlobalService
  ) {}

  ngOnInit() {}

  async save() {
    this.global.alert(
      'Language Settings',
      'Your language settings has been changed!',
      ['Okay']
    );
  }
}
