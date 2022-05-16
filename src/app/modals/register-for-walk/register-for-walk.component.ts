import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global/global.service';
import { WalkService } from 'src/app/services/walk/walk.service';

@Component({
  selector: 'app-register-for-walk',
  templateUrl: './register-for-walk.component.html',
  styleUrls: ['./register-for-walk.component.scss'],
})
export class RegisterForWalkComponent implements OnInit {
  walk: any = {};
  subs = [];
  constructor(
    public modalController: ModalController,
    private walkService: WalkService,
    private global: GlobalService,
    private platform: Platform
  ) {}

  ngOnInit() {
    let sub = this.walkService.get().subscribe((data) => (this.walk = data));
    this.subs.push(sub);
    sub = this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
    this.subs.push(sub);
  }
  save() {
    console.log(this.walk);
    this.walkService.register(this.walk);
    this.modalController.dismiss();
    this.global.alert(
      'Diabetes Walk',
      "Email address successfully registered. We'll notify you when the event timeline is ready",
      ['Okay']
    );
  }
}
