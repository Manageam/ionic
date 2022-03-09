import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-share-email',
  templateUrl: './share-email.component.html',
  styleUrls: ['./share-email.component.scss'],
})
export class ShareEmailComponent implements OnInit {
  email = '';
  constructor(
    public modalController: ModalController,
    private global: GlobalService
  ) {}

  ngOnInit() {}

  save() {
    if (!this.email)
      return this.global.alert('Share Record', 'Email is required!', [
        { role: true, text: 'OK' },
      ]);

    return this.modalController.dismiss(this.email);
  }
}
