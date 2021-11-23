import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import categories from 'src/assets/data/education-category';
import topics from 'src/assets/data/topics';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  url = environment.apiUrl + '/educations';
  constructor(private http: HttpClient) {}

  fetchCategories() {
    this.http.get(`${this.url}/categories`).subscribe((data) => {
      localStorage.categories = JSON.stringify(data);
    });
    const fcategories = localStorage.categories;
    localStorage.categories = fcategories
      ? fcategories
      : JSON.stringify(categories);

    return JSON.parse(localStorage.categories);
  }

  fetchCategoryTopics(id) {
    this.http.get(`${this.url}/all`).subscribe((data) => {
      localStorage.categoriesTopics = JSON.stringify(data);
    });

    let sTopics = localStorage.categoriesTopics || JSON.stringify(topics);
    localStorage.categoriesTopics = sTopics;

    return JSON.parse(sTopics).filter((data) => data.category == id);
  }

  getRandomEducational() {
    const topics = JSON.parse(localStorage.categoriesTopics);
    const index = Math.floor(Math.random() * topics.length - 1);
    return topics[index];
  }
}
