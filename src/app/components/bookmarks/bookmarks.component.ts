import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BookmarkComponent } from '../bookmark/bookmark.component';
import { EducationService } from 'src/app/services/education/education.service';
import dateFormat from 'dateformat';
@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
})
export class BookmarksComponent implements OnInit {
  bookmarks = [];
  constructor(
    public modalController: ModalController,
    private educationService: EducationService
  ) {}

  ngOnInit() {
    this.educationService.getBookmarks().subscribe((data) => {
      this.bookmarks = data.map((data) => {
        const date = dateFormat(
          new Date(data.created_at),
          'dd mmm, yyyy-hh:MMtt'
        );
        return { ...data.education, id: data.id, date };
      });
    });
  }

  async viewBookmark(data) {
    const modal = await this.modalController.create({
      component: BookmarkComponent,
      componentProps: {
        data,
      },
    });
    modal.present();
  }
}
