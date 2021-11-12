import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import exercises from 'src/assets/data/exercise';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
})
export class ExerciseComponent implements OnInit {
  exercises = exercises;
  constructor(public modalController: ModalController) {}

  ngOnInit() {}
}
