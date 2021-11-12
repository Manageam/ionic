import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import foodCategories from 'src/assets/data/food-categories';
import food from 'src/assets/data/food';
@Component({
  selector: 'app-meals-list',
  templateUrl: './meals-list.component.html',
  styleUrls: ['./meals-list.component.scss'],
})
export class MealsListComponent implements OnInit {
  segment = 1;
  @Input() type = '';
  search = '';
  categogories = foodCategories.map((cat) => {
    if (cat.category.length > 13)
      cat.category = cat.category.slice(0, 10) + '...';
    return cat;
  });
  searchCat = foodCategories[0].category;
  food = <any>food;
  filteredFood = [];
  constructor(public modalController: ModalController) {}

  ngOnInit() {
    this.filterFoods(this.categogories[0].id);
  }

  filterFoods(id) {
    const q = new RegExp(this.search, 'ig');
    this.filteredFood = this.food.filter(
      (f) => f.category == this.segment && q.test(f.name)
    );
  }

  inc(food) {
    this.food = this.food.map((f) => {
      if (f.id == food.id) f.amount = f.amount ? f.amount + 1 : 1;
      return f;
    });
  }

  dec(food) {
    this.food = this.food.map((f) => {
      if (f.id == food.id) f.amount = f.amount ? f.amount - 1 : 0;
      return f;
    });
  }

  toggle(food) {
    this.food = this.food.map((f) => {
      if (f.id == food.id) f.amount = f.amount > 0 ? 0 : 1;
      return f;
    });
  }

  segmentChanged(e) {
    this.segment = e.detail.value;
    this.searchCat = foodCategories.find(
      (cat) => cat.id == this.segment
    ).category;
    this.filterFoods(this.segment);
  }
}
