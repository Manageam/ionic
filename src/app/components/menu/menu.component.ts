import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { UserService } from 'src/app/services/user/user.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { BookmarksComponent } from '../bookmarks/bookmarks.component';
import { DiabetesWalkComponent } from '../diabetes-walk/diabetes-walk.component';
import { ExerciseComponent } from '../exercise/exercise.component';
import { ProfileComponent } from '../profile/profile.component';
import { SettingsComponent } from '../settings/settings.component';
import { TermsComponent } from '../terms/terms.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  user: any = {};
  subs = [];
  isShow = false;
  isShowBg = false;
  @Output() onClose = new EventEmitter();
  constructor(
    private modalController: ModalController,
    private userService: UserService,
    private global: GlobalService,
    private router: Router,
    private webSocket: WebsocketService,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    let sub = this.userService.userDetails().subscribe((data) => {
      this.user = data;
    });

    this.subs.push(sub);
    sub = this.webSocket
      .listen('profile:update')
      .subscribe(({ user_id }: { user_id }) => {
        if (user_id != this.auth.loggedUser().id) return;
        this.userService.refectchDetails();
      });
    this.subs.push(sub);
  }

  @Input() set show(data) {
    if (data) this.isShowBg = data;
    setTimeout(() => {
      this.isShow = data;
    });
  }

  close(e) {
    e.stopPropagation();
    this.isShow = false;
    this.onClose.emit(false);
    setTimeout(() => {
      this.isShowBg = false;
    }, 400);
  }
  async showProfile() {
    const modal = await this.modalController.create({
      component: ProfileComponent,
      componentProps: {
        user: this.user,
      },
    });
    modal.present();
  }

  async logout() {
    const { role } = <{ role }>await this.global.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { role: false, text: 'NO' },
        { role: true, text: 'YES' },
      ]
    );

    if (!role) return;
    this.userService.logout();
    this.router.navigate(['/auth']);
  }

  async showExercise() {
    const modal = await this.modalController.create({
      component: ExerciseComponent,
    });
    modal.present();
  }

  async showTerms() {
    const modal = await this.modalController.create({
      component: TermsComponent,
    });
    modal.present();
  }

  async showReminders() {
    this.router.navigate(['/reminder']);
  }

  async showBookmark() {
    const modal = await this.modalController.create({
      component: BookmarksComponent,
    });
    modal.present();
  }

  async showDiabetesWalk() {
    const modal = await this.modalController.create({
      component: DiabetesWalkComponent,
    });
    modal.present();
  }

  async showSettings() {
    const modal = await this.modalController.create({
      component: SettingsComponent,
    });
    modal.present();
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
