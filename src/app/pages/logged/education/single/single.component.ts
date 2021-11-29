import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { EducationService } from 'src/app/services/education/education.service';

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
    private platform: Platform
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

  share() {}
  bookmark(id) {
    this.educationService.addBookmark(id).subscribe((data) => {
      this.educationService.fetchBookmarks();
    });
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
