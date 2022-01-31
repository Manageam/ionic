import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { BookmarkComponent } from '../bookmark/bookmark.component';
import { EducationService } from 'src/app/services/education/education.service';
import dateFormat from 'dateformat';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
})
export class BookmarksComponent implements OnInit {
  bookmarks = [];
  subs = [];
  constructor(
    public modalController: ModalController,
    private educationService: EducationService,
    private platform: Platform,
    private webSocket: WebsocketService,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    let sub = this.educationService.getBookmarks().subscribe((data) => {
      this.bookmarks = data.map((data) => {
        const date = dateFormat(
          new Date(data.created_at),
          'dd mmm, yyyy-hh:MMtt'
        );
        return { ...data.education, id: data.id, date };
      });
    });
    this.subs.push(sub);

    sub = this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
    this.subs.push(sub);

    sub = this.webSocket
      .listen('bookmark:update')
      .subscribe(({ user_id }: { user_id }) => {
        if (user_id != this.auth.loggedUser().id) return;
        this.educationService.fetchBookmarks();
      });
    this.subs.push(sub);
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

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
