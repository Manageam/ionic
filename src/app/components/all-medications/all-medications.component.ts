import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-all-medications',
  templateUrl: './all-medications.component.html',
  styleUrls: ['./all-medications.component.scss'],
})
export class AllMedicationsComponent implements OnInit {
  expand = 0;
  constructor(
    public modalController: ModalController,
    private global: GlobalService
  ) {}

  ngOnInit() {}
  share() {
    console.log('share shit');
  }
  toggle(i) {
    if (i == this.expand) {
      this.expand = null;
    } else {
      this.expand = i;
    }
  }
  async remove(i) {
    const { role } = <{ role }>await this.global.alert(
      'Remove Medication',
      'Are you sure you want to remove medication?',
      [
        { role: false, text: 'Cancel' },
        { role: true, text: 'OK' },
      ]
    );
    console.log(role);
  }
}
