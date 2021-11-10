import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import topics from 'src/assets/data/topics';
import { SingleComponent } from '../single/single.component';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  category: any = {};
  topics = [];
  constructor(public modalController: ModalController) {}

  ngOnInit() {}

  @Input()
  set data(data) {
    this.category = data;
    this.topics = topics.filter((topic) => topic.category == data.id);
  }
  async view(topic) {
    const modal = await this.modalController.create({
      component: SingleComponent,
      componentProps: {
        topic,
      },
    });

    await modal.present();
  }
}
