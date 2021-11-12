import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { BookmarksComponent } from '../bookmarks/bookmarks.component';
import { DiabetesWalkComponent } from '../diabetes-walk/diabetes-walk.component';
import { ExerciseComponent } from '../exercise/exercise.component';
import { ProfileComponent } from '../profile/profile.component';
import { ReminderComponent } from '../reminder/reminder.component';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(
    private menuController: MenuController,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  async showProfile() {
    const modal = await this.modalController.create({
      component: ProfileComponent,
    });
    modal.present();
  }

  async showExercise() {
    const modal = await this.modalController.create({
      component: ExerciseComponent,
    });
    modal.present();
  }

  async showReminders() {
    const modal = await this.modalController.create({
      component: ReminderComponent,
    });
    modal.present();
  }

  async showBookmark() {
    const modal = await this.modalController.create({
      component: BookmarksComponent,
    });
    modal.present();
  }

  async showDiabetesWalk() {
    const modal = await this.modalController.create({
      component: DiabetesWalkComponent,
    });
    modal.present();
  }

  async showSettings() {
    const modal = await this.modalController.create({
      component: SettingsComponent,
    });
    modal.present();
  }
}
