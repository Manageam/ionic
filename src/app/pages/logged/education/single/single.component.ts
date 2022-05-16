import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { EducationService } from 'src/app/services/education/education.service';
import { Share } from '@capacitor/share';
import { GlobalService } from 'src/app/services/global/global.service';
@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss'],
})
export class SingleComponent implements OnInit {
  data: any = {};
  subs = [];
  constructor(
    public modalController: ModalController,
    private educationService: EducationService,
    private platform: Platform,
    private global: GlobalService
  ) {}

  ngOnInit() {
    let sub = this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
    this.subs.push(sub);
  }
  @Input()
  set topic(data) {
    this.data = data;
  }

  share() {
    this.educationService.share(this.data.id).subscribe((url: string) => {
      Share.share({
        title: this.data.title,
        url,
        dialogTitle: 'Share education tip',
      });
    });
  }
  bookmark(id) {
    this.educationService.addBookmark(id).subscribe((data) => {
      this.educationService.fetchBookmarks();
      this.global.alert(
        'Add bookmark',
        'Education has been bookmarked successfully!',
        ['Okay']
      );
    });
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
