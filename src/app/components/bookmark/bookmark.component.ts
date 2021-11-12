import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss'],
})
export class BookmarkComponent implements OnInit {
  @Input() data: any = {};
  constructor(
    public modalController: ModalController,
    private global: GlobalService
  ) {}
  ngOnInit() {}
  async remove(i) {
    const { role } = <{ role }>await this.global.alert(
      'Remove bookmark',
      'Are you sure you want to remove this bookmark',
      [
        { text: 'Cancel', role: false },
        { text: 'OK', role: true },
      ]
    );
    console.log(role);
  }
}
