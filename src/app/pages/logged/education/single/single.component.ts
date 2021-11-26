import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EducationService } from 'src/app/services/education/education.service';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss'],
})
export class SingleComponent implements OnInit {
  data: any = {};
  constructor(
    public modalController: ModalController,
    private educationService: EducationService
  ) {}

  ngOnInit() {}
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
}
