import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BookmarkComponent } from '../bookmark/bookmark.component';
import education from '../../../assets/data/topics';
@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
})
export class BookmarksComponent implements OnInit {
  bookmarks = education.slice(0, 6);
  constructor(public modalController: ModalController) {}

  ngOnInit() {}
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
