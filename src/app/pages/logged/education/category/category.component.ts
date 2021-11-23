import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EducationService } from 'src/app/services/education/education.service';
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
  constructor(
    public modalController: ModalController,
    private educationService: EducationService
  ) {}

  ngOnInit() {}

  @Input()
  set data(data) {
    this.category = data;
    this.topics = this.educationService.fetchCategoryTopics(data.id);
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
