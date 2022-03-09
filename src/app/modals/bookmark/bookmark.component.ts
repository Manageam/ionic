import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { EducationService } from 'src/app/services/education/education.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss'],
})
export class BookmarkComponent implements OnInit {
  @Input() data: any = {};
  subs = [];
  constructor(
    public modalController: ModalController,
    private global: GlobalService,
    private educationService: EducationService,
    private platform: Platform,
    private webSocket: WebsocketService,
    private auth: AuthenticationService
  ) {}
  ngOnInit() {
    let sub = this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
    this.subs.push(sub);
  }
  async remove(id) {
    const { role } = <{ role }>await this.global.alert(
      'Remove bookmark',
      'Are you sure you want to remove this bookmark',
      [
        { text: 'Cancel', role: false },
        { text: 'OK', role: true },
      ]
    );

    if (!role) return;

    this.educationService.deleteBookmark(id).subscribe((data) => {
      this.modalController.dismiss();
      this.webSocket.emit('bookmark:update', {
        user_id: this.auth.loggedUser().id,
      });
    });
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
