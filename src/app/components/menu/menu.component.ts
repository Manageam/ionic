import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { ExerciseComponent } from '../exercise/exercise.component';
import { ProfileComponent } from '../profile/profile.component';

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
}
