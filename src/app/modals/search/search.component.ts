import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { SingleComponent } from 'src/app/pages/logged/education/single/single.component';
import { EducationService } from 'src/app/services/education/education.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searched = [];
  searchText = '';
  allTopics = [];
  subs = [];
  constructor(
    private educationService: EducationService,
    public modalController: ModalController,
    private platform: Platform
  ) {}

  ngOnInit() {
    let sub = this.educationService.allTopics.subscribe((data) => {
      this.allTopics = data;
    });

    this.subs.push(sub);
    sub = this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
    this.subs.push(sub);
  }

  search() {
    this.searched = [];
    if (this.searchText.length < 1) return;
    const query = new RegExp(this.searchText, 'ig');
    this.searched = this.allTopics
      .filter((s) => query.test(s.title) || query.test(s.description))
      .slice(0, 10);
  }
  async view(topic) {
    const modal = await this.modalController.create({
      component: SingleComponent,
      componentProps: {
        topic,
      },
    });
    await modal.present();
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
