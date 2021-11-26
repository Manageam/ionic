import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import categories from 'src/assets/data/education-category';
import topics from 'src/assets/data/topics';
import { UserService } from '../user/user.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  url = environment.apiUrl + '/educations';
  educationBookmark = [];
  bookmarks: Subject<any>;
  constructor(private http: HttpClient, private userService: UserService) {
    const bookmarks = localStorage.bookmarks || '[]';
    this.bookmarks = new BehaviorSubject(JSON.parse(bookmarks));

    this.fetchBookmarks();
  }

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
    let ftopics = localStorage.categoriesfTopics || JSON.stringify(topics);
    ftopics = JSON.parse(ftopics);
    const index = Math.floor(Math.random() * ftopics.length - 1);
    return ftopics[index];
  }

  fetchBookmarks() {
    const {
      user_details: { id },
    } = this.userService.fetchDetails();
    this.http
      .get(`${environment.apiUrl}/bookmarks/all/${id}`)
      .subscribe((data) => {
        localStorage.bookmarks = JSON.stringify(data);
        this.bookmarks.next(data);
      });
  }

  getBookmarks() {
    this.fetchBookmarks();
    return this.bookmarks;
  }

  deleteBookmark(education_id) {
    return this.http.delete(
      `${environment.apiUrl}/bookmarks/delete/${education_id}`
    );
  }

  addBookmark(education_id) {
    const {
      user_details: { id },
    } = this.userService.fetchDetails();

    return this.http.post(`${environment.apiUrl}/bookmarks/create`, {
      education_id,
      user_id: id,
    });
  }
}
