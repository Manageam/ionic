import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EducationService } from 'src/app/services/education/education.service';
import { CategoryComponent } from './category/category.component';
import { SingleComponent } from './single/single.component';
import { shuffle } from 'lodash';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { debounce, scan, throttle } from 'rxjs/operators';
import { interval } from 'rxjs';
@Component({
  selector: 'app-education',
  templateUrl: './education.page.html',
  styleUrls: ['./education.page.scss'],
})
export class EducationPage implements OnInit {
  categories = [];
  subs = [];
  randomEducational: any = {};
  constructor(
    private modalController: ModalController,
    private educationService: EducationService,
    private webSocketService: WebsocketService,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    this.educationService.fetchAllTopics();
    this.educationService.fetchCategories(true);
    let sub = this.educationService.allTopics
      .pipe(debounce((ev) => interval(ev)))
      .subscribe(() => {
        this.randomEducational = this.educationService.getRandomEducational();
      });

    this.subs.push(sub);

    sub = this.educationService.categories
      .pipe(debounce((ev) => interval(ev)))
      .subscribe((categories) => {
        const colors = shuffle([
          'bg-red-300',
          'bg-green-300',
          'bg-indigo-300',
          'bg-purple-300',
          'bg-yellow-300',
          'bg-pink-300',
          'bg-gray-300',
        ]);
        this.categories = categories.map((c, i) => ({
          ...c,
          bg: colors[i],
        }));
      });

    this.subs.push(sub);

    sub = this.webSocketService
      .listen('profile:update')
      .subscribe(({ user_id }: { user_id }) => {
        if (user_id == this.auth.loggedUser().id) {
          this.educationService.fetchAllTopics();
          this.educationService.fetchCategories();
        }
      });

    this.subs.push(sub);
  }

  async viewCategory(category) {
    const modal = await this.modalController.create({
      component: CategoryComponent,
      componentProps: {
        data: category,
      },
    });
    await modal.present();
  }

  async viewEducation() {
    const modal = await this.modalController.create({
      component: SingleComponent,
      componentProps: {
        data: this.randomEducational,
      },
    });
    await modal.present();
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
