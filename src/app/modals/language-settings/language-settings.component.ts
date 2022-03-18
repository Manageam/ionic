import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { EducationService } from 'src/app/services/education/education.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { UserService } from 'src/app/services/user/user.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';

@Component({
  selector: 'app-language-settings',
  templateUrl: './language-settings.component.html',
  styleUrls: ['./language-settings.component.scss'],
})
export class LanguageSettingsComponent implements OnInit {
  languages = [];
  subs = [];
  langId = null;
  user: any = {};
  constructor(
    public modalController: ModalController,
    private global: GlobalService,
    private platform: Platform,
    private educationService: EducationService,
    private userService: UserService,
    private webSocket: WebsocketService,
    private alertCtr: AlertController
  ) {}

  ngOnInit() {
    let sub = this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
    this.subs.push(sub);
    sub = this.educationService.languages.subscribe((lang) => {
      this.languages = lang;
    });
    this.subs.push(sub);

    this.userService.userDetails().subscribe((user) => {
      this.langId = user.language_id;
      this.user = user;
    });

    this.subs.push(sub);
  }

  async close() {
    if (this.langId == this.user.language_id) return;

    const role = <{ role }>await this.global.alert(
      'Language Settings',
      'Do you want to save changes before closing?',
      [
        { text: 'Yes', role: true },
        { text: 'Cancel', role: false },
      ]
    );
    if (role) return this.save(this.langId);
    this.modalController.dismiss();
  }

  async save(language_id) {
    this.userService.updateDetails({ language_id }).subscribe((data) => {
      this.webSocket.emit('profile:update', {
        user_id: this.user.id,
      });

      this.global.alert(
        'Language Settings',
        'Your language prefrence has been changed successfully!',
        ['OK']
      );
      setTimeout(() => {
        this.alertCtr.dismiss();
      }, 1000);

      this.modalController.dismiss();
    });
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
