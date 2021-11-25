import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global/global.service';
import { UserService } from 'src/app/services/user/user.service';
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
  user: any = {};
  subs = [];
  constructor(
    private menuController: MenuController,
    private modalController: ModalController,
    private userService: UserService,
    private global: GlobalService
  ) {}

  ngOnInit() {
    let sub = this.userService.details.subscribe((data) => {
      this.user = data;
    });

    this.subs.push(sub);
  }

  async showProfile() {
    const modal = await this.modalController.create({
      component: ProfileComponent,
    });
    modal.present();
  }

  async logout() {
    const { role } = <{ role }>await this.global.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { role: false, text: 'NO' },
        { role: true, text: 'YES' },
      ]
    );

    if (!role) return;
    this.userService.logout();
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

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
