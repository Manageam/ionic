import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
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
  totalCals = 0;
  subs = [];
  currentPage = 0;
  pagination = 8;
  categories = foodCategories;
  /*categories = foodCategories.map((cat) => {
    if (cat.category.length > 13)
      cat.category = cat.category.slice(0, 10) + '...';
    return cat;
  });*/
  searchCat = foodCategories[0].category;
  food = <any[]>food.map((d: any) => ({ ...d, amount: 0 }));
  filteredFood = [];
  constructor(
    public modalController: ModalController,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.filterFoods(this.categories[0].id);
    let sub = this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
    this.subs.push(sub);
  }

  @Input()
  set data(data) {
    this.food = this.food.map((food) => {
      data.forEach((d) => {
        if (food.id == d.id) food = d;
      });
      return food;
    });
  }

  filterFoods(id) {
    const q = new RegExp(this.search, 'ig');
    this.filteredFood = this.food.filter(
      (f) => f.category == this.segment && q.test(f.name)
    );
    this.calculateCalories();
  }

  inc(food) {
    this.food = this.food.map((f) => {
      if (f.id == food.id) f.amount = f.amount + 1;
      return f;
    });
    this.calculateCalories();
  }

  dec(food) {
    this.food = this.food.map((f) => {
      if (f.id == food.id) f.amount = f.amount ? f.amount - 1 : 0;
      return f;
    });
    this.calculateCalories();
  }

  toggle(food) {
    this.food = this.food.map((f) => {
      if (f.id == food.id) f.amount = f.amount > 0 ? 0 : 1;
      return f;
    });
    this.calculateCalories();
  }

  calculateCalories() {
    this.totalCals = this.food
      .reduce((a, b: any) => a + Number(b.amount || 0) * b.calories, 0)
      .toFixed(2);
  }

  segmentChanged(e) {
    this.segment = e.detail.value;
    this.searchCat = foodCategories.find(
      (cat) => cat.id == this.segment
    ).category;
    this.filterFoods(this.segment);
  }

  save() {
    const foods = this.food.filter((f) => f.amount > 0);
    this.modalController.dismiss(foods);
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  generatePagination(page) {
    page = Math.round(page);
    return Array(page)
      .fill(null)
      .map((_, i) => i);
  }
}
