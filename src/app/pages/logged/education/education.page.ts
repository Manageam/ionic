import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import catetories from '../../../../assets/data/education-category';
import { CategoryComponent } from './category/category.component';
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
  categories = catetories.map((c, i) => ({ ...c, bg: colors[i] }));
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async viewCategory(category) {
    const modal = await this.modalController.create({
      component: CategoryComponent,
      componentProps: {
        data: category,
      },
    });
    await modal.present();
  }
}
