import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { EducationService } from 'src/app/services/education/education.service';
import { GlobalService } from 'src/app/services/global/global.service';

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
    private platform: Platform
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
      this.educationService.fetchBookmarks();
    });
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
