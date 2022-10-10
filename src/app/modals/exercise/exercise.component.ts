import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import exercises from 'src/assets/data/exercise';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
})
export class ExerciseComponent implements OnInit {
  exercises = exercises;
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

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
