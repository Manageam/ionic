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
  constructor(private http: HttpClient) {
    this.http.get(`${this.url}/all`).subscribe((data) => {
      localStorage.categoriesTopics = JSON.stringify(data);
    });

    this.http.get(`${this.url}/categories`).subscribe((data) => {
      localStorage.categories = JSON.stringify(data);
    });
  }

  fetchCategories() {
    const fcategories = localStorage.categories;
    localStorage.categories = fcategories
      ? fcategories
      : JSON.stringify(categories);

    return JSON.parse(localStorage.categories);
  }

  fetchCategoryTopics(id) {
    let sTopics = localStorage.categoriesTopics || JSON.stringify(topics);
    localStorage.categoriesTopics = sTopics;

    return JSON.parse(sTopics).filter((data) => data.category == id);
  }

  getRandomEducational() {
    let ftopics = localStorage.categoriesfTopics || JSON.stringify(topics);
    ftopics = JSON.parse(ftopics);
    const index = Math.floor(Math.random() * ftopics.length - 1);
    return ftopics[index];
  }
}
