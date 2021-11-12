import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

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
  constructor(public modalController: ModalController) {}

  ngOnInit() {}

  save() {}
}
