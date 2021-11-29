import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
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
  subs = [];
  constructor(
    public modalController: ModalController,
    private educationService: EducationService,
    private platform: Platform
  ) {}

  ngOnInit() {
    let sub = this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
    this.subs.push(sub);
  }

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

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
