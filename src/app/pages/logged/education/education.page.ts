import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EducationService } from 'src/app/services/education/education.service';
import { CategoryComponent } from './category/category.component';
import { SingleComponent } from './single/single.component';
const colors = [
  'bg-red-300',
  'bg-green-300',
  'bg-indigo-300',
  'bg-purple-300',
  'bg-yellow-300',
  'bg-pink-300',
  'bg-gray-300',
];
@Component({
  selector: 'app-education',
  templateUrl: './education.page.html',
  styleUrls: ['./education.page.scss'],
})
export class EducationPage implements OnInit {
  categories = [];
  randomEducational: any = {};
  constructor(
    private modalController: ModalController,
    private educationService: EducationService
  ) {}

  ngOnInit() {
    this.categories = this.educationService.fetchCategories();
    this.categories = this.categories.map((c, i) => ({ ...c, bg: colors[i] }));
    this.randomEducational = this.educationService.getRandomEducational();
  }

  async viewCategory(category) {
    const modal = await this.modalController.create({
      component: CategoryComponent,
      componentProps: {
        data: category,
      },
    });
    await modal.present();
  }

  async viewEducation() {
    const modal = await this.modalController.create({
      component: SingleComponent,
      componentProps: {
        data: this.randomEducational,
      },
    });
    await modal.present();
  }
}
